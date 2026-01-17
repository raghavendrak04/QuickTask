import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../services/analyticsService';
import StatsCard from './StatsCard';
import PriorityChart from './PriorityChart';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [trends, setTrends] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?._id) {
            fetchAnalytics();
        }
    }, [user]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [statsData, trendsData] = await Promise.all([
                analyticsService.getUserStats(user._id),
                analyticsService.getProductivityTrends(user._id),
            ]);
            setStats(statsData);
            setTrends(trendsData);
        } catch (err) {
            setError('Failed to fetch analytics. Make sure the Python service is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Loading analytics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <div className="error-message">{error}</div>
                <button className="btn-primary" onClick={fetchAnalytics}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>📊 Analytics Dashboard</h1>
                <p>Welcome back, {user?.fullName}!</p>
            </div>

            {stats && (
                <>
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <StatsCard
                            title="Total Tasks"
                            value={stats.totalTasks}
                            icon="📝"
                            color="#667eea"
                        />
                        <StatsCard
                            title="Completed"
                            value={stats.completedTasks}
                            icon="✅"
                            color="#48bb78"
                        />
                        <StatsCard
                            title="Pending"
                            value={stats.pendingTasks}
                            icon="⏳"
                            color="#ed8936"
                        />
                        <StatsCard
                            title="Completion Rate"
                            value={`${stats.completionPercentage}%`}
                            icon="🎯"
                            color="#4299e1"
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="charts-section">
                        <div className="chart-card">
                            <h2>Priority Distribution</h2>
                            <PriorityChart data={stats.priorityBreakdown} />
                        </div>

                        <div className="chart-card">
                            <h2>Status Breakdown</h2>
                            <div className="status-breakdown">
                                {Object.entries(stats.statusBreakdown).map(([status, count]) => (
                                    <div key={status} className="status-item">
                                        <span className="status-label">{status}</span>
                                        <div className="status-bar-container">
                                            <div
                                                className="status-bar"
                                                style={{
                                                    width: `${(count / stats.totalTasks) * 100}%`,
                                                    background:
                                                        status === 'Completed' ? '#48bb78' :
                                                            status === 'In Progress' ? '#4299e1' : '#ed8936'
                                                }}
                                            />
                                            <span className="status-count">{count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Productivity Trends */}
                    {trends && (
                        <div className="trends-section">
                            <h2>📈 Productivity Trends</h2>

                            <div className="weekly-comparison">
                                <div className="week-card">
                                    <h3>Current Week</h3>
                                    <div className="week-stats">
                                        <div>
                                            <span className="stat-label">Created:</span>
                                            <span className="stat-value">{trends.weeklyStats.currentWeek.created}</span>
                                        </div>
                                        <div>
                                            <span className="stat-label">Completed:</span>
                                            <span className="stat-value">{trends.weeklyStats.currentWeek.completed}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="week-card">
                                    <h3>Last Week</h3>
                                    <div className="week-stats">
                                        <div>
                                            <span className="stat-label">Created:</span>
                                            <span className="stat-value">{trends.weeklyStats.lastWeek.created}</span>
                                        </div>
                                        <div>
                                            <span className="stat-label">Completed:</span>
                                            <span className="stat-value">{trends.weeklyStats.lastWeek.completed}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="week-card">
                                    <h3>Avg. Completion Time</h3>
                                    <div className="avg-time">
                                        {trends.averageCompletionTime}
                                    </div>
                                </div>
                            </div>

                            <div className="daily-activity">
                                <h3>Daily Activity (Last 7 Days)</h3>
                                <div className="activity-grid">
                                    {trends.tasksPerDay.map((day) => (
                                        <div key={day.date} className="activity-day">
                                            <div className="day-date">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                            <div className="day-bars">
                                                <div className="bar-group">
                                                    <div className="bar created" style={{ height: `${day.created * 20}px` }} title={`Created: ${day.created}`} />
                                                    <span className="bar-label">{day.created}</span>
                                                </div>
                                                <div className="bar-group">
                                                    <div className="bar completed" style={{ height: `${day.completed * 20}px` }} title={`Completed: ${day.completed}`} />
                                                    <span className="bar-label">{day.completed}</span>
                                                </div>
                                            </div>
                                            <div className="day-legend">
                                                <span className="legend-created">C</span>
                                                <span className="legend-completed">✓</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
