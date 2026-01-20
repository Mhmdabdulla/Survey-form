import React from 'react';
import { X, Inbox, Loader2 } from 'lucide-react';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';

const SubmissionDrawer = ({ isOpen, isLoading, submission, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md transform transition-transform bg-white shadow-2xl">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white">
                            {isLoading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mx-auto mb-4" />
                                        <p className="text-gray-600 font-medium">Loading details...</p>
                                    </div>
                                </div>
                            ) : submission ? (
                                <>
                                    <DrawerHeader submission={submission} onClose={onClose} />
                                    <DrawerContent submission={submission} />
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center p-8 text-center">
                                    <div>
                                        <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">No details available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDrawer;