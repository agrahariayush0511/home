const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json());
const User = require('./db/userSchema')
dotenv.config({path:'./src/cred.env'})


const mongoose = require('mongoose')
const DB = process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connection successful')
}).catch((e) => {
    console.log('connetion failed')
})


const port = process.env.PORT || 5000;
app.use(require('./Server/auth'))

app.listen(port, () => {
    console.log('connection secure')
});