const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className="stats-card" style={{ borderTopColor: color }}>
            <div className="stats-icon" style={{ background: `${color}20`, color }}>
                {icon}
            </div>
            <div className="stats-content">
                <h3>{title}</h3>
                <p className="stats-value">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;
