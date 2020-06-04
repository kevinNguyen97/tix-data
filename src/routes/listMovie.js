const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const { phimValidation } = require('../../validation')
const CurentMovie = require('../models/CurentMovie');
const CommingSoonMovie = require('../models/CommingSoonMovie')
const { _Post, _DeleteByID, _Get, _GetByID } = require('../method')
//get all post

router.get('/DanhSachPhimSapChieu', async (req, res) => {
    await _Get(req, res, CommingSoonMovie);
})
router.get('/DanhSachPhimDangChieu', async (req, res) => {
    await _Get(req, res, CurentMovie);
})
router.get('/DanhSachPhimSapChieu/:postID', async (req, res) => {
    await _GetByID(req, res, CommingSoonMovie);
})
router.get('/DanhSachPhimDangChieu/:postID', async (req, res) => {
    await _GetByID(req, res, CurentMovie);
})
router.post('/ThemPhimDangChieu', async (req, res) => {
    await PostMovie(req, res, CurentMovie)
});
router.post('/ThemPhimSapChieu', async (req, res) => {
    await PostMovie(req, res, CommingSoonMovie)
});
router.delete('/XoaPhimDangChieu/:ID', async (req, res) => {
    await _DeleteByID(req, res, CurentMovie)
});
router.delete('/XoaPhimSapChieu/:ID', async (req, res) => {
    await _DeleteByID(req, res, CommingSoonMovie)
})

const PostMovie = async (req, res, Model) => {
    const { error } = phimValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check maPhim is already in database
    const maPhimExist = await Model.findOne({ maPhim: req.body.details.film_id });
    if (maPhimExist)
        return res.status(400).send('ma phim da ton tai');
    // create new user
    const Movie = new Model({
        maPhim: req.body.details.film_id,
        tenPhim: req.body.details.film_name_vn,
        biDanh: req.body.details.film_name_en,
        trailer: `https://www.youtube.com/embed/${req.body.details.media_id}`,
        moTa: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores aperiam iste repellat enim debitis.",
        hinhAnh: req.body.details.poster_url,
        maNhom: 'GP15',
        ngayKhoiChieu: req.body.details.publish_date,
        danhGia: req.body.details.avg_point_showing,
        details: req.body.details
    });
    await _Post(req, res, Model, Movie)
}


module.exports = router;