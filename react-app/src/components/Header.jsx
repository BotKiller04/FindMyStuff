import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header(){
    const navigate= useNavigate()
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <div>
            <Link to='/'  className='category'>HOME</Link>
            <Link to='/add-post'><button>ADD POST</button></Link>
            {localStorage.getItem('token') && <Link to='/my-posts'><button>MY POSTS</button></Link>}
            {!localStorage.getItem('token') && <Link to="/login"  className='category'> LOGIN </Link>}
            {!localStorage.getItem('token') && <Link to="/sign-up"  className='category'> SIGNUP </Link>}
            {localStorage.getItem('token') && <button onClick={handleLogOut}>LOGOUT</button>}
        </div>
    )
}
export default Header;