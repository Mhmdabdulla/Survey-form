import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Table = ({ columns, data, sortable = false }) => {
    const [sortConfig, setSortConfig] = useState(null);

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-left bg-white text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold border-b border-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`px-6 py-4 whitespace-nowrap ${sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
                                onClick={() => sortable && requestSort(col.key)}
                            >
                                <div className="flex items-center gap-1">
                                    {col.label}
                                    {sortConfig && sortConfig.key === col.key && (
                                        sortConfig.direction === 'ascending' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {sortedData.length > 0 ? (
                        sortedData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
