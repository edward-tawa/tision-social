import React from 'react';
import { InstitutionInterface } from "@/app/data/institution/types";
import { School, MapPin, BadgeCheck } from 'lucide-react';

interface InstitutionProps {
    institution: InstitutionInterface
}


const Institution: React.FC<InstitutionProps> = ({ institution }) => {
    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-3 p-4 min-h-[200px]">
            {/* Institution Name */}
            <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <School className="w-5 h-5 text-indigo-600" />
                <span>{institution.name || ""}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{institution.location || ""}</span>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{institution.email || ""}</span>
                <span>{institution.address || ""}</span>
                <span>{institution.websiteUrl || ""}</span>
            </div>

            {/* Offers */}
            <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <BadgeCheck className="w-4 h-4 text-green-600" />
                    <span>Offers</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {institution.offers.length > 0 ? (
                        institution.offers.map((offer, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                            >
                                {offer}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No offers available</span>
                    )}
                </div>
            </div>

        </div>
    );
};
export default Institution;
