import User from '../models/user_model.js'
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';
import { errorhandler } from '../utils/error.js';

// next is used for using the middleware made in index.js

export const signup = async(req, res, next) =>{
    // console.log(req.body)
    // res.send(req.body)
    // var bcrypt = require('bcryptjs');
    const {username, email, password} = req.body;
    // var salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, 10)
    // 10 in above line is salt which round off the value for more complexity    
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User created succesfully")
    } catch (error) {
        // res.status(500).json(error.message)   -- this was without using middleware
        next(error)
        // above next error is used to put the error message using middleware applied in index.js

// below code is to add errors manually
        // next(errorhandler(550, "Error from the function"))
    }
}

export const signin = async(req, res, next) =>{
    const {email, password} = req.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorhandler(404, 'User Not Found'))
    
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorhandler(401, 'Wrong Credentials'))

        // authentication process:-
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)

        // destructuring the password(removing password and will return rest in our auth cookie section)
        const {password: pass, ...rest} = validUser._doc;
        
        res.cookie('access token', token, {httpOnly: true}).status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const google = async(req, res, next) =>{
    try {
       const user = await User.findOne({email: req.body.email}) 

       if(user){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        const {password: pass, ...rest} = user._doc;

        res.cookie('access token', token, {httpOnly: true})
        .status(200)
        .json(rest)
       } 
       else{
        const generatedPassword = Math.random().toString(36).slice(-8);

        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

        const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email:req.body.email, password: hashedPassword, avatar: req.body.photo})

        await newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = newUser._doc
        res.cookie('access token', token, {httpOnly: true}).status(200).json(rest)
       }
    } catch (error) {
        next(error)
    }
}