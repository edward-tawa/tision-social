import React from 'react';
import { InstitutionInterface } from "@/app/data/institution/types";
import Institution from "@/app/institution/Institution";

interface InstitutionListProps {
    institutions: InstitutionInterface[];
}

const InstitutionList: React.FC<InstitutionListProps> = ({ institutions }) => {
    return (
        <div className="bg-white p-2 rounded-lg shadow-md w-full grid grid-cols-12 gap-2 sm:gap-4">
            {
                (institutions || []).map(institution => (
                    <div key={institution.id} className="col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-3">
                        <Institution institution={institution} />
                    </div>
                ))
            }
        </div>
    )
}

export default InstitutionList