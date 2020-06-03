const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    taiKhoan: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    matKhau: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    soDt: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    maNhom: {
        type: String,
        required: true,
        max: 50
    },
    maLoaiNguoiDung: {
        type: String,
        required: true,
    },
    hoTen: {
        type: String,
        required: true,
        max: 255

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)