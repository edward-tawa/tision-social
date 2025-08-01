import React from 'react';
import Companies from './Institutions';
import Suggestions from './Suggestions';




const RightPanel = () => {
    return (
        <div className="sm:flex sm:flex-col rounded px-3 py-1 gap-y-4">
            <Companies />
            <Suggestions />
        </div>
    )
}

export default RightPanel