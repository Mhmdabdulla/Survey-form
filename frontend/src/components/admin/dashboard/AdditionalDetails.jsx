import React from 'react';

const AdditionalDetails = ({ address, message }) => {
    return (
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-pink-500 pl-2">
                Details
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">
                        Address
                    </label>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed shadow-sm">
                        {address || "No address provided."}
                    </div>
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">
                        Message
                    </label>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap shadow-sm min-h-[100px]">
                        {message || "No message provided."}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalDetails;