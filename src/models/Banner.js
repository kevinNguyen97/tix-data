const mongoose = require('mongoose');
const BannerModel = {
    hinhAnh: {
        type: String,
    },
    trailer: {
        type: String,
    },
    tenPhim: {
        type: String,
    },
    moTa: {
        type: String,
    },
    biDanh: {
        type: String,
    },
    banner_id: {
        type: Number,
    },
    details: {
        type: Object,
        required: true
    }

}
const BannerHomeSchema = mongoose.Schema(BannerModel);
module.exports = mongoose.model('BannerHome', BannerHomeSchema);