const express = require("express");
const router = express.Router();
const {createTask, getTask, getAllTasks, deleteTask, updateTask} = require("../../controller/tasks/tasksController");

router.route("/createtask").post(createTask);
router.route("/gettask/:id").get(getTask);
router.route("/getalltasks").get(getAllTasks);
router.route("/deletetask/:id").delete(deleteTask);
router.route("/updatetask/:id").put(updateTask);


module.exports = router;