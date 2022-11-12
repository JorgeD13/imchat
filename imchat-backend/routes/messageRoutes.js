const { addmsg, getmsg, getlastmsg } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg", addmsg);
router.get("/getmsg", getmsg);
router.get("/getlastmsg", getlastmsg);

module.exports = router;
