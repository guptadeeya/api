import jwt from "jsonwebtoken";
import { errorhandler } from '../utils/error.js'

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    console.log(token)

    if(!token) return next(errorhandler(401, 'Unauthorised'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return next(errorhandler(403, 'Forbidden'))

        req.user = user

        next()
    })
}