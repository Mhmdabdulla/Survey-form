import React from 'react';

const Demographics = ({ gender, nationality }) => {
    return (
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-purple-500 pl-2">
                Demographics
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                    <div className="text-xs text-gray-400 mb-1">Gender</div>
                    <div className="font-semibold text-gray-800">{gender}</div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-center">
                    <div className="text-xs text-gray-400 mb-1">Nationality</div>
                    <div className="font-semibold text-gray-800">{nationality}</div>
                </div>
            </div>
        </div>
    );
};

export default Demographics;
