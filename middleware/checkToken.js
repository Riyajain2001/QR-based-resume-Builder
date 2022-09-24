const express = require('express')
const app = express()
var jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const validateToken = (req,res,next) => {
    
    token = req.cookies.token
    userName = req.cookies.userName
    try{
    var decoded = jwt.verify(token, 'iNeuron');
    next()
}
    catch{
        console.log("token issue")
        res.status(501).redirect('/login')
    }

}

module.exports = validateToken
