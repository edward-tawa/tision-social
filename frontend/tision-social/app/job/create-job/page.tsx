import React from 'react'
import CreateJob from "../../components/admin/job/CreateJob"

const page = () => {
    return (
        <div className="flex flex-col px-2 py-2 rounded-lg gap-3">
            <CreateJob />
        </div>
    )
}

export default page