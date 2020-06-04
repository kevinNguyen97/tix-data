const express = require('express');
const router = express.Router();
const { _Post, _DeleteByID, _Get, _GetByID } = require('../method')
const Partner = require('../models/Partner')



router.get('/', async (req, res) => {
    await _Get(req, res, Partner);
})
router.post('/', async (req, res) => {
    await PostPartner(req, res, Partner)
});
router.delete('/:ID', async (req, res) => {
    await _DeleteByID(req, res, Partner)
})
const PostPartner = async (req, res, Model) => {
    // const { error } = phimValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // check maPhim is already in database
    const partnerExist = await Model.findOne({ title: req.body.title });
    if (partnerExist)
        return res.status(400).send('partner da ton tai');
    // create new user
    const target = new Model({
        title: req.body.title,
        href: req.body.href,
        link: req.body.link,
    });
    await _Post(req, res, Model, target)
}
module.exports = router;
