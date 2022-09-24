const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../models/userRegSchema')
var Resuser = require('../models/resumeSchema')
const qr = require("qrcode");


const checkToken = require('../middleware/checkToken')

router.get('/register', (req,res) => {
    res.render('registeration')
})

router.get('/login', (req,res) => {
    res.render('login')
})


router.post('/register', urlencodedParser, async (req,res) => {
    console.log(req.body)
    const hash = bcrypt.hashSync(req.body.password,10);
    try {
    await User.create({
        name : req.body.name,
        email : req.body.email,
        password : hash
    });
    res.redirect("/login")  
    } catch {
        res.redirect('/')
    }

})

router.post('/login', urlencodedParser, async (req,res) => {

    var email = req.body.email

    await User.find({ email: email}, (err,docs) => {
        if(err){
            res.send("Email Id not found")
        }
        if(bcrypt.compareSync(req.body.password, docs[0].password)){
            const token = jwt.sign({
                data: email
              }, 'iNeuron', { expiresIn: '1h' });
    
            res.cookie('userName', email)
            res.cookie('token', token)   
            res.redirect('/')
            
        }
        else{
            res.send("Wrong Password")
        }
    })
    
})

router.get('/', checkToken, (req,res) => {
    res.render('landingPage', {userName})

})

router.get('/savedResumes', async(req,res) => {

    await Resuser.find({ email: req.cookies.userName}, (err,docs) => {
        if(err){
            res.send("Email Id not found")
        }
        else{
            console.log(docs[0])
            res.send("Saved RESUMES Successfullly")
        }

    })    

})



router.get('/createResume', (req,res) => {
        res.render('form1')
})

router.post('/createResume', urlencodedParser, async(req,res) => {
    try {
        console.log(req.body)
        // let id
        await Resuser.create({
            username: req.body.email ,
            name: req.body.name,
            email:req.body.email,
            objective: req.body.objective,
            name: req.body.name,
            universityname : req.body.universityname,
            major: req.body.major,
            minor: req.body.minor,
            officeskills: req.body.officeskills,
            computerskils:req.body.computerskils, 
            experience1: req.body.experience1,
            experience2: req.body.experience2,
            hobbies: req.body.hobbies,
            date:new Date()
        }, (err,id) => {
            // id = id._id.toString()
            res.redirect(`seeResume/${id._id.toString()}`)  

        });
        } catch (err) {
            console.log(err)
            res.redirect('/')
        }
})

router.get('/seeResume/:id', async  (req,res) => {
    await Resuser.find({_id: req.params.id}, (err,docs) => {
        res.render('resume1.ejs', {name:docs[0].name, email:docs[0].email, objective: docs[0].objective, universityname: docs[0].universityname, major: docs[0].major, minor: docs[0].minor,officeskills: docs[0].officeskills, computerskils: docs[0].computerskills, expereince1: docs[0].expereince1, experience2: docs[0].experience2, hobbies: docs[0].hobbies})
    })
    
})

router.post('/scan',urlencodedParser, (req,res) => {
    console.log(req)
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
      
        res.render("scan", { src });
    });
})


module.exports = router
