import React from 'react'
import { InstitutionInterface } from "@/app/data/institution/types";
import Institution from "@/app/components/institution/Institution";

interface InstitutionListProps {
  institutions: InstitutionInterface[];
}

const InstitutionList: React.FC<InstitutionListProps> = ({ institutions }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 sm:col-span-3 gap-2">
        {
          institutions.map(institution => (
            <Institution key={institution.id} institution={institution} />
          ))
        }
      </div>
    </div>

  )
}

export default InstitutionList