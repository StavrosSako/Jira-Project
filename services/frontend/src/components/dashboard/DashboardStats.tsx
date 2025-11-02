function DashboardStats() {
  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-info">
          <h3 className="stat-value">0</h3>
          <p className="stat-label">Active Tasks</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3 className="stat-value">0</h3>
          <p className="stat-label">Teams</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3 className="stat-value">0</h3>
          <p className="stat-label">Projects</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <h3 className="stat-value">0</h3>
          <p className="stat-label">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;

