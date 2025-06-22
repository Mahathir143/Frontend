import { NavLink } from 'react-router-dom';
import {
    Home,
    User,
    Settings,
    BarChart3,
    Users,
    FileText,
    Bell,
} from 'lucide-react';

const Sidebar = ({ collapsed }) => {
    const menuItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/reports', icon: FileText, label: 'Reports' },
        { path: '/notifications', icon: Bell, label: 'Notifications' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-brand">
                <img src="/vite.svg" alt="Logo" />
                <h4 className="text-white mt-2 mb-0">Frontend</h4>
            </div>

            <nav>
                <ul className="sidebar-menu">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path} className="sidebar-menu-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `sidebar-menu-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <Icon className="sidebar-menu-icon" size={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;