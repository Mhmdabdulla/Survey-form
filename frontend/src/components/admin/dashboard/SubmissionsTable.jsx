import React from 'react';
import { Eye, SortAsc, SortDesc } from 'lucide-react';
import SubmissionMobileCard from './SubmissionMobileCard';

const SubmissionsTable = ({ submissions, sortBy, sortOrder, onSort, onViewDetails }) => {
    const columns = [
        {
            key: 'name',
            label: 'User',
            sortable: true,
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
            sortable: true,
            render: (_, row) => (
                <div className="flex flex-col">
                    <span className="text-sm text-gray-700 font-medium">{row.email}</span>
                    <span className="text-xs text-gray-400 mt-0.5">
                        {new Date(row.submittedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
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
                    onClick={() => onViewDetails(row)}
                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="View Details"
                >
                    <Eye className="h-5 w-5" />
                </button>
            )
        }
    ];

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col.sortable ? (
                                        <button
                                            onClick={() => onSort(col.key)}
                                            className="flex items-center gap-1 hover:text-gray-700"
                                        >
                                            {col.label}
                                            {sortBy === col.key && (
                                                sortOrder === 'asc' ? 
                                                <SortAsc className="h-4 w-4" /> : 
                                                <SortDesc className="h-4 w-4" />
                                            )}
                                        </button>
                                    ) : (
                                        col.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {submissions.map((row) => (
                            <tr key={row.id || row._id} className="hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100 p-4">
                {submissions.map((submission) => (
                    <SubmissionMobileCard
                        key={submission.id || submission._id}
                        submission={submission}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
        </>
    );
};

export default SubmissionsTable;