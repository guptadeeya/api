import User from '../models/user_model.js'
import bcryptjs from "bcryptjs"
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