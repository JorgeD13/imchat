const { register, login, verify } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login)
router.post("/code", verify)

module.exports = router;

