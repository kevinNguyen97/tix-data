const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verify = require('./verifyToken');
const { phimValidation } = require('../../validation')
const CurentMovie = require('../models/CurentMovie');
const CommingSoonMovie = require('../models/CurentMovie');

//get all post

router.get('/DanhSachPhimSapChieu', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/ThemPhimDangChieu', async (req, res) => {
    const { error } = phimValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check maPhim is already in database
    const maPhimExist = await CurentMovie.findOne({ maPhim: req.body.maPhim });
    if (maPhimExist)
        return res.status(400).send('ma phim da ton tai');

    // create new user
    const Movie = new CurentMovie({
        maPhim: req.body.details.film_id,
        tenPhim: req.body.details.film_name_vn,
        biDanh: req.body.details.film_name_en,
        trailer: `https://www.youtube.com/embed/${req.body.details.media_id}`,
        moTa: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores aperiam iste repellat enim debitis.",
        hinhAnh: req.body.details.poster_url,
        maNhom: 'GP15',
        ngayKhoiChieu: req.body.details.publish_date,
        danhGia: req.body.details.avg_point_showing,
        details:req.body.details
    });
    try {
        const savePhim = await Movie.save();
        res.send(savePhim);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/ThemPhimSapChieu', async (req, res) => {
    const { error } = phimValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check maPhim is already in database
    const maPhimExist = await CommingSoonMovie.findOne({ maPhim: req.body.maPhim });
    if (maPhimExist)
        return res.status(400).send('ma phim da ton tai');

    // create new user
    const Movie = new CommingSoonMovie({
        maPhim: req.body.details.film_id,
        tenPhim: req.body.details.film_name_vn,
        biDanh: req.body.details.film_name_en,
        trailer: `https://www.youtube.com/embed/${req.body.details.media_id}`,
        moTa: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores aperiam iste repellat enim debitis.",
        hinhAnh: req.body.details.poster_url,
        maNhom: 'GP15',
        ngayKhoiChieu: req.body.details.publish_date,
        danhGia: req.body.details.avg_point_showing,
        details:req.body.details
    });
    try {
        const savePhim = await Movie.save();
        res.send(savePhim);
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;

