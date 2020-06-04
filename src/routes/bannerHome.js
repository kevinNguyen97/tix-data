const express = require('express');
const router = express.Router();
const { _Post, _DeleteByID, _Get } = require('../method')
const Banner = require('../models/Banner')



router.get('/', async (req, res) => {
    await _Get(req, res, Banner);
})
router.post('/', async (req, res) => {
    await PostBanner(req, res, Banner)
});
router.delete('/:ID', async (req, res) => {
    await _DeleteByID(req, res, Banner)
})
const PostBanner = async (req, res, Model) => {
    // const { error } = phimValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // check maPhim is already in database
    const maPhimExist = await Model.findOne({ maPhim: req.body.details.banner_id });
    if (maPhimExist)
        return res.status(400).send('ma phim da ton tai');
    // create new user
    const Movie = new Model({
        banner_id: req.body.details.banner_id,
        tenPhim: req.body.details.film_name,
        biDanh: req.body.details.film_slug,
        trailer: `https://www.youtube.com/embed/${req.body.details.media_id}`,
        moTa: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores aperiam iste repellat enim debitis.",
        hinhAnh: req.body.details.banner_url,
        details: req.body.details
    });
    await _Post(req, res, Model, Movie)
}
module.exports = router;
