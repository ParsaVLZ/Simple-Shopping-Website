const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
    code: { type: Number, default: undefined },
    expiresIn: {type: Number, default: 0}
});

const UserSchema = new Schema({
    fullName: {type: String},
    mobile: {type: Number, required: true},
    otp: {type: OTPSchema},
    verifiedMobile: {type: Boolean, required: true, default: false},
    accessToken: {type: String}
}, {timestamps: true});

const UserModel = model('user', UserSchema);

module.exports = UserModel;