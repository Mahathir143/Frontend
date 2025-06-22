import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setSidebarCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="main-wrapper">
            <Sidebar collapsed={sidebarCollapsed} />
            <div className={`content-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
                <Header onMenuToggle={toggleSidebar} />
                <main className="main-content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;