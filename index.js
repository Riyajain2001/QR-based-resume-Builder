const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const qr = require("qrcode");
const cookieParser = require('cookie-parser')
app.use(cookieParser());

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

// Database Connection
mongoose.connect("mongodb://localhost:27017/resumeBuilder", () => {
    console.log("Database Connected")
})

// app.use(cookieParser());

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', authRoute)

app.listen(3000, () => {
    console.log("App Listening on PORT 3000")
})
