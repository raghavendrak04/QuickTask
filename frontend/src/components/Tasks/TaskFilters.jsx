const TaskFilters = ({ filters, setFilters }) => {
    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const handleReset = () => {
        setFilters({
            priority: '',
            status: '',
            search: '',
            sortBy: 'createdAt',
            sortOrder: 'desc',
        });
    };

    return (
        <div className="filters-container">
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="🔍 Search tasks..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <select
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="filter-group">
                <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Statuses</option>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="filter-group">
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="filter-select"
                >
                    <option value="createdAt">Created Date</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

            <div className="filter-group">
                <select
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                    className="filter-select"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <button onClick={handleReset} className="btn-reset">
                Reset Filters
            </button>
        </div>
    );
};

export default TaskFilters;
