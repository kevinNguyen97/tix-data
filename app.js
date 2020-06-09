const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');

app.use(bodyParser.json())
app.use(cors());
//config port
const PORT = process.env.PORT || 5200;
//import postrouter
const postsRoute = require('./src/routes/posts');
const authRoute = require('./src/routes/auth')
const movieManage = require('./src/routes/listMovie');
const banner = require('./src/routes/bannerHome');
const partner = require('./src/routes/partner');


app.use('/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/QuanLyPhim', movieManage);
app.use('/api/Banner', banner);
app.use('/api/Partner', partner);


//routes
// app.get('/', (req, res) => {
//     res.send('home')
// })
//conext to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db')
    })


app.listen(PORT, () => {
    console.log('server up and running' + PORT)
})