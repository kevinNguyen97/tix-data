const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verify = require('./verifyToken')
//get all post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json('there my post ')
    } catch (err) {
        res.json({ message: err })

    }
})
//submit post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }

});
// auth
router.get('/auth',verify, async (req, res) => {
    res.json({
        title: "my title",
        description: 'my description'
    })
    // const post = new Post({
    //     title: req.body.title,
    //     description: req.body.description
    // });
    // try {
    //     const savePost = await post.save();
    //     res.json(savePost);
    // } catch (err) {
    //     res.json({ message: err })
    // }

});
// get one
router.get('/:postID', async (req, res) => {

    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json({ message: err })

    }
})

// delete by id
router.delete('/:postID', async (req, res) => {

    try {
        const removePost = await Post.remove({ _id: req.params.postID });
        res.json(removePost);
    } catch (err) {
        res.json({ message: err })

    }
})
// update
router.patch('/:postID', async (req, res) => {

    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.postID },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            });
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err })

    }
})
module.exports = router;