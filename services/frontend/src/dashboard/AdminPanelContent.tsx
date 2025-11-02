interface AdminPanelContentProps {
  loadingUsers: boolean;
  pendingUsers: any[];
  onApproveUser: (userId: number) => void;
  onRejectUser: (userId: number) => void;
}

function AdminPanelContent({ loadingUsers, pendingUsers, onApproveUser, onRejectUser }: AdminPanelContentProps) {
  return (
    <div className="admin-panel">
      <h2 className="section-title">Pending User Approvals</h2>
      {loadingUsers ? (
        <div className="empty-state">
          <p className="empty-state-text">Loading...</p>
        </div>
      ) : pendingUsers.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">No pending approvals</p>
        </div>
      ) : (
        <div className="pending-users-list">
          {pendingUsers.map((pendingUser: any) => (
            <div key={pendingUser.id} className="pending-user-card">
              <div className="pending-user-info">
                <h3 className="pending-user-name">{pendingUser.username}</h3>
                <p className="pending-user-email">{pendingUser.email}</p>
                <span className="pending-user-badge">Pending Approval</span>
              </div>
              <div className="pending-user-actions">
                <button 
                  className="approve-btn"
                  onClick={() => onApproveUser(pendingUser.id)}
                >
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => onRejectUser(pendingUser.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanelContent;

