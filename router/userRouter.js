const express = require('express');
const router = express.Router();
const {body,validationResult} =  require('express-validator');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

//register user

router.post('/register',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
] ,async (request , response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty){
        return response.statu(401).json({errors : errors.array()});
    }

    try{
        let {name , email, password} = request.body;
        //check user is already exist or not
        let user = await User.findOne({email , email});
        if(user){
            return response.status(401).json({
                errors :[{msg : 'User alerady exist'}]
            })
        }

        //encrypt token
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password , salt);
        
        //avatar
        let avatar = gravatar.url(email,{
            s : '300',
            r : 'pg',
            d : 'mm'
        });
        //save to database
        user = new User({name ,  email ,  password , avatar});
        await user.save();
        response.status(200).json({msg : 'Registration is Success'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({errors : [{msg : error.message}]});
    }
});



//login user
router.post('/login',[
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
] , async (request, response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return  response.status(401).json({errors : errors.array()});
    }
    
    try{
        let {email , password} = request.body;
        //check user is registered or not
        let user = await User.findOne({email , email});
        if(!user){
            return response.status(401).json({errors : [{msg: 'No record found'}]});
        }
        //chech password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({errors : [{msg : 'Invalid credentials'}]});
        }
        //create token
        let payload = {
            user : {
                id : user.id,
                name : user.name
            }
        };
        jwt.sign( payload , process.env.JWT_SECRET_KEY , (error , token)=>{
            if(error) throw error;
            response.status(200).json({
                msg : 'Login success',
                token : token
            })
        } );

    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors :[{msg : error.message}]
        })
    }
});


//get a user
router.get('/me', authenticate, async (request , response)=>{
    try{
        let user = await User.findById(request.user.id);
        response.status(200).json({
            user : user
        })
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors  :[{msg : error.message}]
        })
    }
});



module.exports = router;
