const { register, login, verify, getusers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/code", verify);
router.post("/allusers", getusers);

module.exports = router;

