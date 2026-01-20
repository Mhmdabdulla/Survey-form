import React from 'react';
import Card from '../../ui/Card';
import Input from '../../ui/Input';
import { Search } from 'lucide-react';

const DashboardFilters = ({
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    dateFilter,
    setDateFilter,
    setCurrentPage,
    clearFilters
}) => {
    const hasActiveFilters = searchQuery || genderFilter;

    return (
        <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                        style={{ marginBottom: 0 }}
                    />
                </div>

                {/* Gender Filter */}
                <select
                    value={genderFilter}
                    onChange={(e) => {
                        setGenderFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {/* Date Filter */}
                <select
                    value={dateFilter}
                    onChange={(e) => {
                        setDateFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {searchQuery && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            Search: {searchQuery}
                        </span>
                    )}
                    {genderFilter && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {genderFilter}
                        </span>
                    )}
                    <button
                        onClick={clearFilters}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium ml-2"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </Card>
    );
};

export default DashboardFilters;