import React from 'react'
import CompanySuggestion from './CompanySuggestion'

const CompanySuggestionsList = () => {
    return (
        <div className="flex flex-col gap-2 px-2 py-2 bg-white rounded-lg">
            <CompanySuggestion />
            <CompanySuggestion />
            <CompanySuggestion />
        </div>
    )
}

export default CompanySuggestionsList