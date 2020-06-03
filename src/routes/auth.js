const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//validation
const { registerValidation, loginValidation } = require('../../validation')

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check user is already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('email already exists');

    const userExist = await User.findOne({ taiKhoan: req.body.taiKhoan });
    if (userExist)
        return res.status(400).send('user already exists');
    // hash passwords

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.matKhau, salt);

    // create new user
    const user = new User({
        taiKhoan: req.body.taiKhoan,
        matKhau: hashedPassword,
        email: req.body.email,
        soDt: req.body.soDt,
        maNhom: req.body.maNhom,
        maLoaiNguoiDung: req.body.maLoaiNguoiDung,
        hoTen: req.body.hoTen
    });


    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checkUser
    const user = await User.findOne({ taiKhoan: req.body.taiKhoan });
    if (!user)
        return res.status(400).send('user is not found');

    //check password
    const validPass = await bcrypt.compare(req.body.matKhau, user.matKhau);
    if (!validPass) return res.status(400).send('invalid password');
// create token
const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);
    // res.send({
    //     id: user._id,
    //     taiKhoan: user.taiKhoan,
    //     email: user.email,
    //     soDt: user.soDt,
    //     maNhom: user.maNhom,
    //     maLoaiNguoiDung: user.maLoaiNguoiDung,
    //     hoTen: user.hoTen
    // });
})
module.exports = router;