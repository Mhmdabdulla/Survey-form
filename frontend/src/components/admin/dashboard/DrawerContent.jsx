import React from 'react';
// import { useToast } from '../../context/ToastContext';
import ContactInfo from './ContactInfo';
import Demographics from './Demographics';
import AdditionalDetails from './AdditionalDetails';

const DrawerContent = ({ submission }) => {
    return (
        <div className="relative flex-1 py-6 px-4 sm:px-6">
            <div className="space-y-8">
                <ContactInfo 
                    email={submission.email} 
                    phone={submission.phone} 
                />
                <Demographics 
                    gender={submission.gender} 
                    nationality={submission.nationality} 
                />
                <AdditionalDetails 
                    address={submission.address} 
                    message={submission.message} 
                />
            </div>
        </div>
    );
};

export default DrawerContent;