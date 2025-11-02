import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';
import QuickActions from '../components/dashboard/QuickActions';
import AdminPanelMenu from '../components/dashboard/AdminPanelMenu';
import AdminPanelContent from '../components/dashboard/AdminPanelContent';
import DashboardStats from '../components/dashboard/DashboardStats';
import EmptySections from '../components/dashboard/EmptySections';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchPendingUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoadingUsers(true);
    try {
      const response = await fetch('http://localhost:3001/api/users/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const users = await response.json();
        const pending = users.filter((u: any) => u.status === 'pending');
        setPendingUsers(pending);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleApproveUser = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/users/users/${userId}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchPendingUsers();
      }
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const handleRejectUser = async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/users/users/${userId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchPendingUsers();
      }
    } catch (error) {
      console.error('Failed to reject user:', error);
    }
  };

  const handleManageUsersClick = () => {
    console.log('Manage Users clicked, current state:', showAdminPanel);
    setShowAdminPanel(!showAdminPanel);
    if (!showAdminPanel && pendingUsers.length === 0) {
      fetchPendingUsers();
    }
  };

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <div className="dashboard-nav-content">
          <div className="dashboard-nav-left">
            <div className="dashboard-nav-logo">
              <span className="dashboard-logo-icon">✓</span>
              <span className="dashboard-logo-text">Jira Clone</span>
            </div>
            <div className="dashboard-nav-menu">
              <button 
                className={`nav-menu-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`nav-menu-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`nav-menu-btn ${activeTab === 'teams' ? 'active' : ''}`}
                onClick={() => setActiveTab('teams')}
              >
                Teams
              </button>
              <button 
                className={`nav-menu-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </button>
            </div>
          </div>
          <div className="dashboard-nav-right">
            <div className="dashboard-user-badge">
              <span className="user-badge-icon">{user.username.charAt(0).toUpperCase()}</span>
              <span className="user-badge-name">{user.username}</span>
            </div>
            <button onClick={handleLogout} className="dashboard-logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <QuickActions 
            onDashboardClick={() => {
              setActiveTab('overview');
              setShowAdminPanel(false);
            }}
          />

          <div className="sidebar-section">
            <h3 className="sidebar-section-title">My Work</h3>
            <div className="sidebar-item">
              <span>Assigned to Me</span>
            </div>
            <div className="sidebar-item">
              <span>Favorites</span>
            </div>
            <div className="sidebar-item">
              <span>Recent</span>
            </div>
          </div>

          {user.role === 'admin' && (
            <AdminPanelMenu 
              onManageUsersClick={handleManageUsersClick}
              pendingUsersCount={pendingUsers.length}
            />
          )}
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="dashboard-tab-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, {user.username}!</h1>
              </div>

              {showAdminPanel && user.role === 'admin' ? (
                <AdminPanelContent 
                  loadingUsers={loadingUsers}
                  pendingUsers={pendingUsers}
                  onApproveUser={handleApproveUser}
                  onRejectUser={handleRejectUser}
                />
              ) : (
                <>
                  <DashboardStats />
                  <EmptySections />
                </>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="dashboard-tab-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Projects</h1>
                <button className="primary-button">Create Project</button>
              </div>
              <p>Projects view coming soon...</p>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="dashboard-tab-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Teams</h1>
                <button className="primary-button">Create Team</button>
              </div>
              <p>Teams view coming soon...</p>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="dashboard-tab-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Tasks</h1>
                <button className="primary-button">Create Task</button>
              </div>
              <p>Tasks view coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
