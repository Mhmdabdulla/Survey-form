import React, { useEffect, useState, useCallback } from 'react';
import Card from '../components/ui/Card';
import { fetchSurveys, fetchSurveyById } from '../services/admin.service';
import { useToast } from '../context/ToastContext';
import { Loader2, Inbox } from 'lucide-react';
import DashboardHeader from '../components/admin/dashboard/DashboardHeader';
import DashboardFilters from '../components/admin/dashboard/DashboardFilters';
import SubmissionsTable from '../components/admin/dashboard/SubmissionsTable';
import SubmissionDrawer from '../components/admin/dashboard/SubmissionDrawer';
import Pagination from '../components/admin/dashboard/Pagination';

const AdminDashboard = () => {
    // Data state
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);
    
    // Filter & Sort state
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [genderFilter, setGenderFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('latest');
    
    // Loading states
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    
    const { addToast } = useToast();

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch surveys with all filters
    const loadSurveys = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: pageSize,
                search: debouncedSearch,
                sortBy,
                sortOrder: dateFilter === 'latest' ? 'desc' : 'asc',
                ...(genderFilter && { gender: genderFilter })
            };

            const data = await fetchSurveys(params);
            setSubmissions(data.surveys || []);
            setTotalPages(data.pagination?.totalPages || 1);
            setTotalCount(data.pagination?.total || 0);
        } catch (error) {
            addToast(error.message || 'Failed to load surveys', 'error');
            setSubmissions([]);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, debouncedSearch, sortBy, dateFilter, genderFilter, addToast]);

    useEffect(() => {
        loadSurveys();
    }, [loadSurveys]);

    const handleViewDetails = async (submission) => {
        setIsDrawerOpen(true);
        setIsLoadingDetail(true);
        setSelectedSubmission(null);
        
        try {
            const detailData = await fetchSurveyById(submission.id || submission._id);
            setSelectedSubmission(detailData);
        } catch (error) {
            addToast(error.message || 'Failed to load survey details', 'error');
            setIsDrawerOpen(false);
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setGenderFilter('');
        setDateFilter('latest');
        setSortBy('createdAt');
        setSortOrder('desc');
        setCurrentPage(1);
    };

    const filterConfig = {
        searchQuery,
        setSearchQuery,
        genderFilter,
        setGenderFilter,
        dateFilter,
        setDateFilter,
        setCurrentPage,
        clearFilters
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <DashboardHeader totalCount={totalCount} />
                <DashboardFilters {...filterConfig} />

                <Card className="overflow-hidden p-0">
                    {isLoading ? (
                        <div className="p-12 flex flex-col items-center justify-center">
                            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                            <p className="text-gray-600 font-medium">Loading surveys...</p>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
                            <Inbox className="h-16 w-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No submissions found</h3>
                            <p className="max-w-xs mx-auto mt-1">
                                {searchQuery || genderFilter
                                    ? "Try adjusting your filters"
                                    : "Wait for new submissions"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <SubmissionsTable
                                submissions={submissions}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                                onSort={handleSort}
                                onViewDetails={handleViewDetails}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </Card>
            </div>

            <SubmissionDrawer
                isOpen={isDrawerOpen}
                isLoading={isLoadingDetail}
                submission={selectedSubmission}
                onClose={() => setIsDrawerOpen(false)}
            />
        </div>
    );
};

export default AdminDashboard;