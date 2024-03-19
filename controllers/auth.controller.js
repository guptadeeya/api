import User from '../models/user_model.js'
import bcryptjs from "bcryptjs"

export const signup = async(req, res) =>{
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
        res.status(500).json(error.message)
    }

}