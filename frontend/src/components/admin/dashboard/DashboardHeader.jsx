import React from 'react';

const DashboardHeader = ({ totalCount }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Survey Submissions
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage and review incoming survey data ({totalCount} total)
                </p>
            </div>
        </div>
    );
};

export default DashboardHeader;
