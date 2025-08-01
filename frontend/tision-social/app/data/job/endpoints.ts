
export const jobEndPoints = {
    createjob: "/job/add",
    getjobs: (id: number) => `/job/all/${id}`,
    getjob: (id: number) => `/job/${id}`,
    updatejob: (id: number) => `/job/update/${id}`,
    deletejob: (id: number) => `/job/delete/${id}`,

}