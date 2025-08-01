import React from 'react'

const CompanyMetrics = () => {
    return (
        <div className="bg-white rounded-lg py-2 px-2">
            <h2 className="text-lg font-semibold mb-2">Company Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <span className="text-gray-500">Employees</span>
                    <span className="text-xl font-bold">500+</span>
                </div>
            </div>

        </div>
    )
}

export default CompanyMetrics