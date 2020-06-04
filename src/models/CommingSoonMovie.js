const mongoose = require('mongoose');
const PhimModel = {
    maPhim: {
        type: Number,
    },
    tenPhim: {
        type: String,
    },
    biDanh: {
        type: String,
    },
    trailer: {
        type: String,
    },
    moTa: {
        type: String,
    },
    maNhom: {
        type: String,
    },
    hinhAnh: {
        type: String,
    },
    ngayKhoiChieu: {
        type: String,
    },
    danhGia: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    details: {
        type:Object,
        required: true
    }

}
const CommingSoonMovieSchema = mongoose.Schema(PhimModel);

module.exports = mongoose.model('CommingSoonMovie', CommingSoonMovieSchema);
