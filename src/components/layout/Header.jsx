import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = ({ onMenuToggle }) => {
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard';
        if (path === '/profile') return 'Profile';
        if (path === '/settings') return 'Settings';
        if (path === '/analytics') return 'Analytics';
        if (path === '/users') return 'Users';
        if (path === '/reports') return 'Reports';
        if (path === '/notifications') return 'Notifications';
        return 'Frontend App';
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header d-flex align-items-center justify-content-between px-3">
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-link mobile-menu-btn me-3 p-0"
                    onClick={onMenuToggle}
                >
                    <Menu size={24} />
                </button>
                <h4 className="mb-0 text-dark">{getPageTitle()}</h4>
            </div>

            <div className="d-flex align-items-center">
                {/* Search */}
                <div className="me-3 d-none d-md-block">
                    <div className="input-group" style={{ width: '300px' }}>
                        <span className="input-group-text bg-light border-end-0">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Notifications */}
                <button className="btn btn-link text-dark me-3 position-relative">
                    <Bell size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                    </span>
                </button>

                {/* User Dropdown */}
                <Dropdown align="end">
                    <Dropdown.Toggle
                        variant="link"
                        className="user-dropdown d-flex align-items-center text-decoration-none text-dark"
                        id="user-dropdown"
                    >
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6c757d&color=fff`}
                            alt="User Avatar"
                            className="user-avatar me-2"
                        />
                        <span className="d-none d-md-inline">{user?.name || 'User'}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">
                            <User size={16} className="me-2" />
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="/settings">
                            <Settings size={16} className="me-2" />
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            <LogOut size={16} className="me-2" />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;