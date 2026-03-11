import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    FlaskConical,
    FileText,
    Link2,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', key: 'dashboard' },
];

export default function PortalLayout({
    categoryName,
    categoryStandards,
    activeSection,
    onSectionChange,
    children,
    topbarTitle,
    topbarActions,
}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('ayusethu_role');
        localStorage.removeItem('ayusethu_category');
        localStorage.removeItem('ayusethu_email');
        navigate('/Login');
    };

    return (
        <div className="portal-layout">
            {/* LEFT SIDEBAR */}
            <aside className="portal-sidebar">
                <div className="sidebar-brand">
                    <span className="brand-mono">AYU·SETHU</span>
                    <span className="category-badge">{categoryName}</span>
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map((item) => (
                        <div
                            key={item.key}
                            className={`sidebar-nav-item ${activeSection === item.key ? 'active' : ''}`}
                            onClick={() => onSectionChange(item.key)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <LogOut size={14} />
                        <span>Logout</span>
                    </button>
                    <span className="compliance-tag">{categoryStandards}</span>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="portal-main">
                <div className="portal-topbar">
                    <span className="topbar-title">{topbarTitle || categoryName}</span>
                    <div className="topbar-actions">
                        {topbarActions}
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
