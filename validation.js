
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        hoTen: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        matKhau: Joi.string().min(6).required(),
        taiKhoan: Joi.string().min(6).required(),
        soDt: Joi.string().min(6).max(20).required(),
        maNhom: Joi.string().min(6).required(),
        maLoaiNguoiDung: Joi.string().min(6).required(),
    });
    return schema.validate(data);

}
const loginValidation = (data) => {
    const schema = Joi.object({
        matKhau: Joi.string().min(6).required(),
        taiKhoan: Joi.string().min(6).required(),
    });
    return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
