interface AdminPanelMenuProps {
  onManageUsersClick: () => void;
  pendingUsersCount: number;
}

function AdminPanelMenu({ onManageUsersClick, pendingUsersCount }: AdminPanelMenuProps) {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-section-title">Admin Panel</h3>
      <button className="sidebar-action-btn" onClick={onManageUsersClick}>
        <span>Manage Users</span>
        {pendingUsersCount > 0 && <span className="notification-badge">{pendingUsersCount}</span>}
      </button>
      <button className="sidebar-action-btn">
        <span>All Teams</span>
      </button>
    </div>
  );
}

export default AdminPanelMenu;

