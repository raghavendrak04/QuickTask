import { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import './Tasks.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        priority: '',
        status: '',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    useEffect(() => {
        fetchTasks();
    }, [filters]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '')
            );
            const data = await taskService.getTasks(cleanFilters);
            setTasks(data.tasks);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (taskData) => {
        try {
            await taskService.createTask(taskData);
            setShowForm(false);
            fetchTasks();
        } catch (err) {
            throw err;
        }
    };

    const handleUpdate = async (id, taskData) => {
        try {
            await taskService.updateTask(id, taskData);
            setEditingTask(null);
            fetchTasks();
        } catch (err) {
            throw err;
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                alert('Failed to delete task');
            }
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await taskService.updateTaskStatus(id, status);
            fetchTasks();
        } catch (err) {
            alert('Failed to update task status');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    return (
        <div className="tasks-container">
            <div className="tasks-header">
                <h1>My Tasks</h1>
                <button
                    className="btn-primary"
                    onClick={() => {
                        setEditingTask(null);
                        setShowForm(!showForm);
                    }}
                >
                    {showForm ? 'Cancel' : '+ New Task'}
                </button>
            </div>

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={editingTask ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                />
            )}

            <TaskFilters filters={filters} setFilters={setFilters} />

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="empty-state">
                    <h2>No tasks found</h2>
                    <p>Create your first task to get started!</p>
                </div>
            ) : (
                <div className="tasks-grid">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
