const router = require("express").Router();

const History = require("../controllers/historyController");

router.get("/", History.findHistories);
router.get("/:id", History.findHistoryById);
router.post("/create", History.createHistory);
router.put("/update/:id", History.updateHistory);
router.delete("/delete/:id", History.deleteHistory);

module.exports = router;
