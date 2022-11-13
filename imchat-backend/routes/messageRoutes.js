const { addmsg, getmsgs, getlastmsg } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg", addmsg);
router.post("/getmsgs", getmsgs);
router.get("/getlastmsg", getlastmsg);

module.exports = router;
