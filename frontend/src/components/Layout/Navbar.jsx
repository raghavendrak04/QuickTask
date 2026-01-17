import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    ✨ QuickTask
                </Link>

                {isAuthenticated && (
                    <div className="navbar-menu">
                        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                            📊 Dashboard
                        </Link>
                        <Link to="/tasks" className={`nav-link ${isActive('/tasks')}`}>
                            📝 Tasks
                        </Link>
                    </div>
                )}

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <>
                            <span className="user-name">👋 {user?.fullName}</span>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary-small">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
