import React from 'react';
import { Eye } from 'lucide-react';

const SubmissionMobileCard = ({ submission, onViewDetails }) => {
    return (
        <div className="py-4 space-y-4 first:pt-0">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {submission.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">{submission.name}</h3>
                        <p className="text-xs text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => onViewDetails(submission)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                    <Eye className="h-5 w-5" />
                </button>
            </div>

            <div className="pl-[3.25rem] space-y-2">
                <div className="text-sm text-gray-600 break-words">{submission.email}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {submission.gender}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {submission.nationality}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SubmissionMobileCard;