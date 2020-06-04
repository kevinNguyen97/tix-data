const mongoose = require('mongoose');
const PartnerModel = {
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

}
const PartnerSchema = mongoose.Schema(PartnerModel);
module.exports = mongoose.model('Partner', PartnerSchema);