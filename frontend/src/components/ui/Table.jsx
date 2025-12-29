import React, { useState } from 'react';

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

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '1rem',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
    };

    const thStyle = {
        textAlign: 'left',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        fontWeight: 600,
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        cursor: sortable ? 'pointer' : 'default',
        borderBottom: '1px solid var(--border)',
    };

    const tdStyle = {
        padding: '1rem',
        borderBottom: '1px solid var(--border)',
        color: 'var(--text-main)',
        fontSize: '0.9rem',
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={thStyle}
                                onClick={() => sortable && requestSort(col.key)}
                            >
                                {col.label} {sortConfig && sortConfig.key === col.key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length > 0 ? (
                        sortedData.map((row, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f9fafb' }}>
                                {columns.map((col) => (
                                    <td key={col.key} style={tdStyle}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ ...tdStyle, textAlign: 'center', padding: '2rem' }}>
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
