const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", verifyToken, taskController.getTaskData);
router.post("/", verifyToken, taskController.postTask);
router.put(
  "/:id/claimCompleted",
  verifyToken,
  taskController.claimTaskCompletion
);
router.post(
  "/:id/voteOnCompletion",
  verifyToken,
  taskController.voteOnCompletion
);

module.exports = router;
