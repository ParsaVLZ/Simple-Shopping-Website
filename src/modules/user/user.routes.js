const {Router} = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/authorization.guard");
const router = Router();

router.get("/identity", Authorization,userController.identity);

module.exports = {
    UserRouter: router
}