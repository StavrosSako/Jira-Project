interface QuickActionsProps {
  onDashboardClick: () => void;
}

function QuickActions({ onDashboardClick }: QuickActionsProps) {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-section-title">Quick Actions</h3>
      <button 
        className="sidebar-action-btn"
        onClick={onDashboardClick}
      >
        <span>Dashboard</span>
      </button>
      <button className="sidebar-action-btn">
        <span>Create Project</span>
      </button>
      <button className="sidebar-action-btn">
        <span>Create Team</span>
      </button>
      <button className="sidebar-action-btn">
        <span>New Task</span>
      </button>
    </div>
  );
}

export default QuickActions;

