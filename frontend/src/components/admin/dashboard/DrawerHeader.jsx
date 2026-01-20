import React from 'react';
import { X } from 'lucide-react';

const DrawerHeader = ({ submission, onClose }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white" id="slide-over-title">
                    Submission Details
                </h2>
                <button
                    onClick={onClose}
                    className="rounded-full p-1 text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
            <div className="mt-6 flex items-center">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                    {submission.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{submission.name}</h3>
                    <p className="text-sm text-indigo-100">
                        Submitted on {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DrawerHeader;