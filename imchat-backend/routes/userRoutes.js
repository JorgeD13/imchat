const { register, login, verify, getusers, registerphone } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/registerphone", registerphone);
router.post("/login", login);
router.post("/code", verify);
router.post("/allusers", getusers);

module.exports = router;

