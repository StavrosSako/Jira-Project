function EmptySections() {
  return (
    <div className="dashboard-sections">
      <div className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="empty-state">
          <p className="empty-state-text">No recent activity</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">My Teams</h2>
        <div className="empty-state">
          <p className="empty-state-text">No teams yet</p>
        </div>
      </div>
    </div>
  );
}

export default EmptySections;

