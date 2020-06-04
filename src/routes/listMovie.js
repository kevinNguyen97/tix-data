const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verify = require('./verifyToken');
const { phimValidation } = require('../../validation')
const CurentMovie = require('../models/CurentMovie');
const CommingSoonMovie = require('../models/CommingSoonMovie')

//get all post

router.get('/DanhSachPhimSapChieu', async (req, res) => {
    GetMovie(req, res, CommingSoonMovie);
})
router.get('/DanhSachPhimDangChieu', async (req, res) => {
    GetMovie(req, res, CurentMovie);
})
router.get('/DanhSachPhimSapChieu/:postID', async (req, res) => {
    GetMovieByID(req, res, CommingSoonMovie);
})
router.get('/DanhSachPhimDangChieu/:postID', async (req, res) => {
    GetMovieByID(req, res, CurentMovie);
})
router.post('/ThemPhimDangChieu', async (req, res) => {
    await PostMovie(req, res, CurentMovie)
});
router.post('/ThemPhimSapChieu', async (req, res) => {
    await PostMovie(req, res, CommingSoonMovie)
});
router.delete('/XoaPhimDangChieu/:ID', async (req, res) => {
    await DeleteMovieByID(req, res, CurentMovie)
});
router.delete('/XoaPhimSapChieu/:ID', async (req, res) => {
    await DeleteMovieByID(req, res, CommingSoonMovie)
})
router.delete('/XoaPhimSapChieu/:ID', async (req, res) => {
    await DeleteMovieByID(req, res, CommingSoonMovie)
})

const GetMovie = async (req, res, Model) => {
    try {
        const Movie = await Model.find();
        // console.log(posts)
        res.json(Movie)
    } catch (err) {
        res.json({ message: err })
    }
}
const GetMovieByID = async (req, res, Model) => {
    try {
        const post = await Model.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }
}
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
    try {
        const savePhim = await Movie.save();
        res.send(savePhim);
    } catch (err) {
        res.status(400).send(err);
    }
}
const DeleteMovieByID = async (req, res, Model) => {
    // console.log(req.body.ID);
    try {
        const removePost = await Model.findOneAndDelete({ _id: req.params.ID });
        res.json(removePost);
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = router;

// router.delete('/XoaToanBoPhimSapChieu', async (req, res) => {
//     await DeleteAll(req, res, CommingSoonMovie)
// })
// router.delete('/XoaToanBoPhimDangChieu', async (req, res) => {
//     await DeleteAll(req, res, CurentMovie)

// })

// const DeleteAll = async (req, res, Model) => {
//     try {
//         const Movie = await Model.find();
//         console.log(Movie.length)
//         const count = 0;
//         for (const item of Movie) {
//             console.log(item._id)

//             await Model.deleteOne({ _id: item._id })
//                 .then(res => {
//                     if (res.deletedCount === 1)
//                         count++;
//                     console.log(count);
//                 })
//                 .catch(err => {
//                     res.json({ message: err })
//                 })
//         }
//         res.json('delete success ' + count + '/' + Movie.length);
//     } catch (err) {
//         res.json({ message: err })
//     }
// }