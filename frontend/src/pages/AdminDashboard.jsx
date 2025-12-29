import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getSubmissions } from '../utils/storage';

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [submissions, setSubmissions] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            addToast('Session expired. Please login again.', 'error');
            navigate('/admin/login');
        }
    }, [user, loading, navigate, addToast]);

    useEffect(() => {
        setSubmissions(getSubmissions());
    }, []);

    const filteredData = submissions.filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.email.toLowerCase().includes(filter.toLowerCase())
    );

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'gender', label: 'Gender' },
        { key: 'nationality', label: 'Nationality' },
        { key: 'phone', label: 'Phone' },
        { key: 'submittedAt', label: 'Date', render: (date) => new Date(date).toLocaleDateString() },
    ];

    if (loading || !user) return null;

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1 className="font-bold" style={{ fontSize: '2rem' }}>Survey Submissions</h1>
                <div style={{ width: '300px' }}>
                    <Input
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ marginBottom: 0 }}
                    />
                </div>
            </div>

            <Card>
                <Table columns={columns} data={filteredData} sortable />
                <div style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Total Submissions: {filteredData.length}
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
