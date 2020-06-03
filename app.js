const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

app.use(bodyParser.json())

//config port
const PORT = process.env.PORT || 5200;
//import postrouter
const postsRoute = require('./src/routes/posts');
const authRoute = require('./src/routes/auth')

app.use('/posts',postsRoute);
app.use('/api/user',authRoute)

//routes
app.get('/', (req, res) => {
    res.send('home')
})




//conext to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db')
    })


app.listen(PORT,()=>{
    console.log('server up and running'+PORT)
})