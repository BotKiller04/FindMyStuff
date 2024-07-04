const express = require('express');
const router = express();
const passport = require('passport');
require('../passport');

router.use(passport.initialize());
router.use(passport.session());

const userController = require('../controller/userController');

router.get('/', userController.loadAuth);

router.get('/auth/google', passport.authenticate('google', { scope: 
    ['email', 'profile']
}));

router.get('/auth/google/callback', passport.authenticate())