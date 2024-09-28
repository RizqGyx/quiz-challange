const router = require("express").Router();

const History = require("./historyRouter");

router.use("/api/v1/history", History);

module.exports = router;
