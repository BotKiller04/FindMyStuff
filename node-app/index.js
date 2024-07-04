require('dotenv').config();
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage });
const app = express();
const session = require('express-session');
const userRoute=require('./userRoute/userRoute.js');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET}
))
const port = 4000

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
//mongodb+srv://b22072:MongoDB@161003@cluster0.y1zj4ww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const Users = mongoose.model('Users', { username: String, password: String });
const Posts = mongoose.model('Posts', { title: String, desc: String, place: String, category: String, image: String, contact: String, userId:mongoose.Schema.Types.ObjectId, });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/google-login', userRoute);

app.post('/sign-up',(req,res)=>{
    //console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    const user = new Users({ username: username , password:password});
    user.save()
        .then(() =>{res.send({message: "Data saved successfully"})})
        .catch(()=>{res.send({message: 'Server error'})})

})
app.post('/add-post',upload.single('image'),(req,res)=>{
    const title = req.body.title;
    const desc = req.body.desc;
    const place = req.body.place;
    const contact = req.body.contact;
    const category = req.body.category;
    const userId = req.body.userId;
    const image=req.file.path;
    const post = new Posts({title,desc,place,category,image,contact,userId});
    post.save()
        .then(() =>{res.send({message: "Data saved successfully"})})
        .catch(()=>{res.send({message: 'Server error'})})

})

app.get('/get-post',(req,res)=>{
    Posts.find()
    .then((result)=>{
        res.send({message:'products sent', posts:result})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

app.post('/login',(req,res)=>{
    username = req.body.username;
    password = req.body.password;
    Users.findOne({username : username})
        .then((result) =>{
            //console.log('333',result._id);
            
            if(!result){res.send({message: 'User not found'})}
            else{
                if(result.password == password){
                    const token = jwt.sign(
                        {data: result},
                        'TOKENKEY',{expiresIn:60*60*60}
                    );
                    res.send({message: "User found", token: token, userID : result._id})
                }
                else{res.send({message: "Incorrect password"})}
            }
            
        })
        .catch(()=>{
            res.send({message: 'Server error'})
        })
})

app.post('/get-category/:id',(req,res)=>{
    //console.log(req.params.id);
    const category = req.params.id;
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.category==category){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })

})

app.post('/my-posts',(req,res)=>{
    const userid = req.body.userid;
    Posts.find()
    .then((result)=>{
        let ans = new Array();
        for(let element of result){
            if(element.userId==userid){
                ans.push(element)
            }
        }
        res.send({message:'products sent', posts:ans})
    })
    .catch((err)=>{
        res.send({message:'Server error'})
    })
})

async function deletePost(query) {
    try {
        const result = await Posts.deleteOne(query);
        // if (result.deletedCount === 1) {
        //     console.log('Document deleted successfully');
        // } else {
        //     console.log('No documents matched the query. Document not deleted.');
        // }
    } catch (err) {
        console.error('Error deleting document:', err);
    } 
}

app.post('/delete-post',(req,res)=>{
    const pID = req.body.ID;
    Posts.findOne({_id : pID})
    .then((result)=>{
        if (result){
            const query = {_id : pID}
            deletePost(query);
            res.send({message:'Post deleted'})
        } 
    })
    .catch((err)=>{
        res.send({message:'Server errror'})
    })
})
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
