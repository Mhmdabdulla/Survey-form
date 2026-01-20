import React from 'react';
import { Copy } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const ContactInfo = ({ email, phone }) => {
    const { addToast } = useToast();

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        addToast('Copied to clipboard!', 'success');
    };

    return (
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-indigo-500 pl-2">
                Contact Information
            </h3>
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="group">
                    <label className="text-xs font-semibold text-gray-400 block mb-1">
                        Email Address
                    </label>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 break-all">
                            {email}
                        </span>
                        <button
                            onClick={() => copyToClipboard(email)}
                            className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                            title="Copy Email"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="group pt-3 border-t border-gray-100">
                    <label className="text-xs font-semibold text-gray-400 block mb-1">
                        Phone Number
                    </label>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                            {phone}
                        </span>
                        <button
                            onClick={() => copyToClipboard(phone)}
                            className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                            title="Copy Phone"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;