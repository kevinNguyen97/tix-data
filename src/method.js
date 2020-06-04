
const _Get = async (req, res, Model) => {
    try {
        const Movie = await Model.find();
        res.json(Movie)
    } catch (err) {
        res.json({ message: err })
    }
}
const _GetByID = async (req, res, Model) => {
    try {
        const post = await Model.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }
}
const _Post = async (req, res, Model, Obj) => {
    try {
        const savePhim = await Obj.save();
        res.send(savePhim);
    } catch (err) {
        res.status(400).send(err);
    }
}
const _DeleteByID = async (req, res, Model) => {
    try {
        const removePost = await Model.findOneAndDelete({ _id: req.params.ID });
        res.json(removePost);
    } catch (err) {
        res.json({ message: err })
    }
}
const _Patch = async (req, res, Model, data) => {
    try {
        const updatePost = await Model.updateOne(
            { _id: req.params.postID },
            { $set: data }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports._Get = _Get;
module.exports._GetByID = _GetByID;
module.exports._Post = _Post;
module.exports._DeleteByID = _DeleteByID;
module.exports._Patch = _Patch;

