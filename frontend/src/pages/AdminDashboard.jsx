import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import { fetchSurveys } from '../services/admin.service';
import { Eye, Copy, Search, Inbox, X } from 'lucide-react';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await fetchSurveys();
            setSubmissions(data.surveys || []);
        }
        fetch();
    }, []);

    const filteredData = submissions.filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.email.toLowerCase().includes(filter.toLowerCase())
    );

    const handleViewDetails = (submission) => {
        setSelectedSubmission(submission);
        setIsDrawerOpen(true);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here ideally
    };

    const columns = [
        {
            key: 'name',
            label: 'User',
            render: (_, row) => (
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {row.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'email',
            label: 'Contact & Date',
            render: (_, row) => (
                <div className="flex flex-col">
                    <span className="text-sm text-gray-700 font-medium">{row.email}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{new Date(row.submittedAt).toLocaleDateString()}</span>
                </div>
            )
        },
        {
            key: 'info',
            label: 'Info',
            render: (_, row) => (
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {row.gender}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {row.nationality}
                    </span>
                </div>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
                <button
                    onClick={() => handleViewDetails(row)}
                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="View Details"
                >
                    <Eye className="h-5 w-5" />
                </button>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Survey Submissions</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and review incoming survey data</p>
                    </div>

                    <div className="w-full md:w-80 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            placeholder="Search by name or email..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-10 w-full"
                            style={{ marginBottom: 0 }}
                        />
                    </div>
                </div>

                {/* Content Section */}
                <Card className="overflow-hidden p-0">
                    {filteredData.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
                            <Inbox className="h-16 w-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No submissions found</h3>
                            <p className="max-w-xs mx-auto mt-1">Try adjusting your search criteria or wait for new submissions.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <Table columns={columns} data={filteredData} sortable />
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-gray-100 p-4">
                                {filteredData.map((s) => (
                                    <div key={s.id || s._id} className="py-4 space-y-4 first:pt-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                    {s.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">{s.name}</h3>
                                                    <p className="text-xs text-gray-500">{new Date(s.submittedAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleViewDetails(s)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="pl-[3.25rem] space-y-2">
                                            <div className="text-sm text-gray-600 break-words">{s.email}</div>
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                    {s.gender}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                                    {s.nationality}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                                <span>Showing {filteredData.length} submissions</span>
                            </div>
                        </>
                    )}
                </Card>
            </div>

            {/* Detail Drawer Side-over */}
            {isDrawerOpen && selectedSubmission && (
                <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsDrawerOpen(false)}></div>
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md transform transition-transform bg-white shadow-2xl">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white">
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-white" id="slide-over-title">Submission Details</h2>
                                            <button
                                                onClick={() => setIsDrawerOpen(false)}
                                                className="rounded-full p-1 text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
                                            >
                                                <X className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                                                {selectedSubmission.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-xl font-bold text-white">{selectedSubmission.name}</h3>
                                                <p className="text-sm text-indigo-100">Submitted on {new Date(selectedSubmission.submittedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 py-6 px-4 sm:px-6">
                                        <div className="space-y-8">
                                            {/* Contact Info */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-2">Contact Information</h3>
                                                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <div className="group">
                                                        <label className="text-xs font-semibold text-gray-400 block mb-1">Email Address</label>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-900 break-all">{selectedSubmission.email}</span>
                                                            <button
                                                                onClick={() => copyToClipboard(selectedSubmission.email)}
                                                                className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                                title="Copy Email"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="group pt-3 border-t border-gray-100">
                                                        <label className="text-xs font-semibold text-gray-400 block mb-1">Phone Number</label>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium text-gray-900">{selectedSubmission.phone}</span>
                                                            <button
                                                                onClick={() => copyToClipboard(selectedSubmission.phone)}
                                                                className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                                title="Copy Phone"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Demographics */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-purple-500 pl-2">Demographics</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                                                        <div className="text-xs text-gray-400 mb-1">Gender</div>
                                                        <div className="font-semibold text-gray-800">{selectedSubmission.gender}</div>
                                                    </div>
                                                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                                                        <div className="text-xs text-gray-400 mb-1">Nationality</div>
                                                        <div className="font-semibold text-gray-800">{selectedSubmission.nationality}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Info */}
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-pink-500 pl-2">Details</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-xs font-semibold text-gray-400 block mb-1.5">Address</label>
                                                        <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed shadow-sm">
                                                            {selectedSubmission.address || "No address provided."}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-gray-400 block mb-1.5">Message</label>
                                                        <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap shadow-sm min-h-[100px]">
                                                            {selectedSubmission.message || "No message provided."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
