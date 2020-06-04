const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    maPhim: {
        type: Number,
        // required: true,
    },
    tenPhim: {
        type: String,
        // required: true
    },
    biDanh: {
        type: String,
        // required: true,
    },
    trailer: {
        type: String,
        // required: true
    },
    moTa: {
        type: String,
        // required: true
    },
    maNhom: {
        type: String,
        // required: true
    },
    hinhAnh: {
        type: String,
        // required: true
    },
    ngayKhoiChieu: {
        type: String,
        // required: true
    },
    danhGia: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    details: {
        type:Object,
        required: true
    }

})

module.exports = mongoose.model('CurentMovie', PostSchema)