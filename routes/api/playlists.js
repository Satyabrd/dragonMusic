const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const config = require('config')
//bring user model 
const User = require('../../models/dbSchema')
//const imageSchema = require('../../models/imageSchema')
//to bring gravatar
//const gravatar = require('gravatar');
//encrypt password 
//const bcrypt = require('bcryptjs');
//jsonwebtoken
//const jwt = require('jsonwebtoken');
//@route  POST api/users
//@desc   Register user
//@access Public
router.post('/',async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log("req.body is::",req.body);
    const {id, images, subtitle,title,uri} = req.body[0];

    try{
        user = new User({
            id,
            images,
            subtitle,title,uri
        });

        await user.save();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

    //res.send('User route')
});

router.get('/',async (req,res)=>{
    try{
        //see if user exists
        //findOne is a async method which returns a promise
        //const {name, email, password} = req.body;
        let user = await User.find();
        console.log("user is:::",user)
        if(user){
            return res.status(200).send(user);
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;