import React from 'react';

const MOCK_LOTS = {
    oils: [
        { id: 'AYU-OIL-20260301-0001', type: 'Groundnut Oil', procurator: 'Rajan Patel', weight: 500, date: '2026-03-01', grade: 'Special Grade', status: 'VERIFIED' },
        { id: 'AYU-OIL-20260302-0002', type: 'Mustard Oil', procurator: 'Meena Singh', weight: 320, date: '2026-03-02', grade: 'Grade 1', status: 'PENDING' },
        { id: 'AYU-OIL-20260303-0003', type: 'Coconut Oil', procurator: 'Anil Kumar', weight: 150, date: '2026-03-03', grade: 'Grade 2', status: 'FLAGGED' },
        { id: 'AYU-OIL-20260304-0004', type: 'Sunflower Oil', procurator: 'Deepa Nair', weight: 420, date: '2026-03-04', grade: 'Special Grade', status: 'DISPATCHED' },
    ],
    herbs: [
        { id: 'AYU-HERB-20260301-0001', type: 'Ashwagandha Root', procurator: 'Ramesh Yadav', weight: 80, date: '2026-03-01', grade: 'Grade A', status: 'VERIFIED' },
        { id: 'AYU-HERB-20260302-0002', type: 'Tulsi Leaves', procurator: 'Sita Devi', weight: 45, date: '2026-03-02', grade: 'Grade B', status: 'PENDING' },
        { id: 'AYU-HERB-20260303-0003', type: 'Brahmi Whole Plant', procurator: 'Kiran Patil', weight: 60, date: '2026-03-03', grade: 'Grade A', status: 'VERIFIED' },
    ],
    cosmetics: [
        { id: 'AYU-COS-20260301-0001', type: 'Sandalwood Oil', procurator: 'Priya Sharma', weight: 5, date: '2026-03-01', grade: 'ISO 22716 A', status: 'VERIFIED' },
        { id: 'AYU-COS-20260302-0002', type: 'Rose Attar', procurator: 'Farooq Ahmed', weight: 2, date: '2026-03-02', grade: 'COSMOS', status: 'PENDING' },
    ],
    ayurveda: [
        { id: 'AYU-MED-20260301-0001', type: 'Triphala Churna', procurator: 'Dr. Venkat', weight: 200, date: '2026-03-01', grade: 'Schedule T', status: 'VERIFIED' },
        { id: 'AYU-MED-20260302-0002', type: 'Chyawanprash', procurator: 'AyurPharm Ltd.', weight: 500, date: '2026-03-02', grade: 'API', status: 'PENDING' },
    ],
    fandv: [
        { id: 'AYU-FV-20260301-0001', type: 'Organic Mango', procurator: 'Govind Rao', weight: 1000, date: '2026-03-01', grade: 'Export Grade', status: 'VERIFIED' },
        { id: 'AYU-FV-20260302-0002', type: 'Spinach', procurator: 'Lakshmi FPO', weight: 200, date: '2026-03-02', grade: 'A1-NPOP', status: 'PENDING' },
        { id: 'AYU-FV-20260303-0003', type: 'Pomegranate', procurator: 'Manoj Deshmukh', weight: 800, date: '2026-03-03', grade: 'Premium', status: 'FLAGGED' },
    ],
};

const MOCK_STATS = {
    oils: { active: 12, pending: 4, certified: 8, rejected: 1, metric1Label: 'Avg FFA (%)', metric1: '0.32', metric2Label: 'Avg PV', metric2: '6.8' },
    herbs: { active: 18, pending: 6, certified: 11, rejected: 2, metric1Label: 'Withanolide %', metric1: '0.42', metric2Label: 'Identity Pass %', metric2: '94' },
    cosmetics: { active: 7, pending: 3, certified: 4, rejected: 0, metric1Label: 'Avg PV', metric1: '4.2', metric2Label: 'COSMOS Cert', metric2: '3' },
    ayurveda: { active: 9, pending: 5, certified: 4, rejected: 1, metric1Label: 'Active ± Tol %', metric1: '98', metric2Label: 'GMP Pass', metric2: '7' },
    fandv: { active: 22, pending: 8, certified: 12, rejected: 3, metric1Label: 'Pest Detect %', metric1: '4.2', metric2Label: 'Turnaround (hr)', metric2: '28' },
};

const getStatusBadge = (status) => {
    const map = {
        'VERIFIED': 'badge-green',
        'PENDING': 'badge-gold',
        'FLAGGED': 'badge-rust',
        'DISPATCHED': 'badge-sky',
        'REJECTED': 'badge-rust',
    };
    return <span className={map[status] || 'badge-gold'}>{status}</span>;
};

export default function Dashboard({ category, onNavigate, actions }) {
    const lots = MOCK_LOTS[category] || [];
    const stats = MOCK_STATS[category] || {};

    return (
        <div className="dashboard-grid">
            {/* Stats Row */}
            <div className="metric-strip">
                <div className="metric">
                    <div className="metric-value">{stats.active || 0}</div>
                    <div className="metric-label">Active Lots</div>
                </div>
                <div className="metric">
                    <div className="metric-value">{stats.pending || 0}</div>
                    <div className="metric-label">Pending Lab</div>
                </div>
                <div className="metric">
                    <div className="metric-value">{stats.certified || 0}</div>
                    <div className="metric-label">Certified</div>
                </div>
                <div className="metric">
                    <div className="metric-value">{stats.rejected || 0}</div>
                    <div className="metric-label">Rejected</div>
                </div>
                <div className="metric">
                    <div className="metric-value">{stats.metric1 || '—'}</div>
                    <div className="metric-label">{stats.metric1Label || 'Metric 1'}</div>
                </div>
                <div className="metric">
                    <div className="metric-value">{stats.metric2 || '—'}</div>
                    <div className="metric-label">{stats.metric2Label || 'Metric 2'}</div>
                </div>
            </div>


            {/* Quick Actions */}
            <div className="quick-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {actions ? actions.map((act, i) => (
                    <button key={i} className={act.primary ? "btn-primary" : "btn-outline"} onClick={() => onNavigate(act.value)}>
                        {act.label}
                    </button>
                )) : null}
            </div>
        </div>
    );
}
