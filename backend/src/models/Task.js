const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide a task title'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        priority: {
            type: String,
            enum: {
                values: ['Low', 'Medium', 'High'],
                message: 'Priority must be Low, Medium, or High',
            },
            required: [true, 'Please specify task priority'],
        },
        status: {
            type: String,
            enum: {
                values: ['Todo', 'In Progress', 'Completed'],
                message: 'Status must be Todo, In Progress, or Completed',
            },
            default: 'Todo',
        },
        dueDate: {
            type: Date,
            required: [true, 'Please provide a due date'],
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient filtering
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);
