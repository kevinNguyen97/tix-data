
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



const phimValidation = (data) => {
    const schema = Joi.object({
        // maPhim: Joi.number().required(),
        // tenPhim: Joi.string().min(6).required(),
        // biDanh: Joi.string().min(6).required(),
        // trailer: Joi.string().min(6).required(),
        // hinhAnh: Joi.string().min(6).required(),
        // moTa: Joi.string().min(6).required(),
        // maNhom: Joi.string().min(6).required(),
        // ngayKhoiChieu: Joi.string().required(),
        // danhGia: Joi.number().required(),
        details: Joi.object().required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.phimValidation = phimValidation;


