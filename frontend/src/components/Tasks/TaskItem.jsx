const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
    const getPriorityClass = (priority) => {
        return `priority-${priority.toLowerCase()}`;
    };

    const getStatusClass = (status) => {
        return `status-${status.toLowerCase().replace(' ', '-')}`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className={`task-card ${getStatusClass(task.status)}`}>
            <div className="task-header">
                <div className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                </div>
                <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task._id, e.target.value)}
                >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <h3 className="task-title">{task.title}</h3>
            {task.description && <p className="task-description">{task.description}</p>}

            <div className="task-footer">
                <div className="task-date">
                    📅 {formatDate(task.dueDate)}
                </div>
                <div className="task-actions">
                    <button
                        className="btn-icon"
                        onClick={() => onEdit(task)}
                        title="Edit Task"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn-icon"
                        onClick={() => onDelete(task._id)}
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
