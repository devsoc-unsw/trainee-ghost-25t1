const taskServices = require("../services/taskServices");
const errorMap = require("../constants/errorMap");

// A flexible function for getting data realted to tasks. Only fetches tasks
// of a team that the user is in
exports.getTaskData = async (req, res) => {
  try {
    const taskData = await taskServices.getTaskData(req.user.id, req.query);
    return res.status(200).json({ success: true, data: taskData });
  } catch (err) {
    const status = errorMap[err.code]?.httpStatus || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, error: message });
  }
};

exports.postTask = async (req, res) => {
  try {
    const taskData = await taskServices.postTask(req.user.id, req.body);
    return res.status(201).json({ success: true, data: taskData });
  } catch (err) {
    const status = errorMap[err.code]?.httpStatus || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, error: message });
  }
};

// Claim a task is completed, making it pending while others verify whether its
// actually done
exports.claimTaskCompletion = async (req, res) => {
  try {
    await taskServices.claimTaskCompletion(req.params.taskId);
    return res
      .status(200)
      .json({ success: true, message: "Claimed task was completed" });
  } catch (err) {
    const status = errorMap[err.code]?.httpStatus || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, error: message });
  }
};

exports.voteOnCompletion = async (req, res) => {
  try {
    const voteData = await taskServices.voteOnCompletion(
      req.user.id,
      req.params.taskId
    );
    return res.status(200).json({ success: true, data: voteData});
  } catch (err) {
    const status = errorMap[err.code]?.httpStatus || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({ success: false, error: message });
  }
};
