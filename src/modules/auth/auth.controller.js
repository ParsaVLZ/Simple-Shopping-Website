const autoBind = require('auto-bind');
const AuthMessage = require("./auth.messages");
const cookieNames = require("../../common/constant/cookie.enum");
const authService = require('./auth.service');

class AuthController{
    #service;
    constructor(){
        autoBind(this);
        this.#service = authService;
    }
    
    async sendOTP(req, res, next){
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: AuthMessage.SendOtpSuccessfully
            });
        } catch (error) {
            next(error)
        }
    }

    async checkOTP(req, res, next){
        try {
            const {mobile, code} = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res.cookie(cookieNames.AccessToken, token, {
                httpOnly: true
            }).status(200).json({
                message: AuthMessage.LoginSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next){
        try {
            return res.clearCookie(cookieNames.AccessToken).status(200).json({
                message: AuthMessage.LogoutSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()