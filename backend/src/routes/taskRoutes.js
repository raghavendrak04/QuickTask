const express = require('express');
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').post(createTask).get(getTasks);

router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

router.patch('/:id/status', updateTaskStatus);

module.exports = router;
