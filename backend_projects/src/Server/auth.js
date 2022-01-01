const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const app = express()
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
require('../db/conn')
const User = require('../db/userSchema')
const Authenticate = require('./middleware')

app.use(express.json())
// router.get('/', (req, res) => {
//     res.cookie('test', 'ayush')
//     res.send('hello world of developer')
// })


// registration process 


router.post('/register', async(req,res) => {

    try {
        const {name, email, phone, work, password, cpassword} = req.body
        const useremail = await User.findOne({email:email})
        
        if(!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).send({error: "plz fill the field properly"})
        }
        else if(password != cpassword){
            return res.status(422).send({error: "plz fill the field properly"})
        }
        
        if(useremail) {
            return res.status(422).send({error : 'email already exist'})
        }

        else {
            const user = new User({name, email, phone, work, password, cpassword})
            const saveColl = await user.save()
                res.status(201).send({message: "successfully sent"})
        }
    }

    catch(e) {
        res.status(500).send({error: "failed to send data to database"})
    }

})

// sign in process

router.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body 
        const useremail = await User.findOne({email:email})
        
        if(!email || !password) {
            res.status(422).send('plz fill the complete data')
        }

        if(!useremail){
            res.status(422).send('invalid login credentials')
        }

        if(useremail){
            const isMatch = await bcrypt.compare(password, useremail.password)
            const token =await useremail.generateAuthToken();
            res.cookie("confirmtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
            if(!isMatch) {
                res.status(422).send('invalid login credents')
            }
            else if(useremail.email===email && isMatch ){
                res.send('login success')
            }
        }

    }
    catch(e) {
        res.send('error')
        console.log("can't read data")
    }
})

router.get('/contakt', Authenticate,(req, res) => {
    console.log('hello contact')
    res.send('login success')
})

router.post('/message', Authenticate, async (req, res) => {
    try {
        const {name, email, phone, message} = req.body;
        if(!name || !email || !phone || !message) {
            return res.json({error: 'plz filled the conctact form'})
        }
        const userContact = await User.findOne({_id: req.userId})

        if(userContact) {
            const userMessage =await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            // res.status(201).json({message:'user message saved'})
        }
    }
    catch(e) {
        console.log("error sending message")
    }
})

router.get('/Navauth',Authenticate, (req, res)=> {

})

router.get('/logout', (req, res) => {
    res.clearCookie('confirmtoken', {path:'/'})
    res.status(200).send('cookie has been successfully cleared')
})

module.exports = router;