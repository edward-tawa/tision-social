
export const institutionEndPoints = {
    createinstitution: "/institution/add",
    getinstitutions: (id: number) => `/institution/all/${id}`,
    getinstitution: (id: number) => `/institution/${id}`,
    updateinstitution: (id: number) => `/institution/update/${id}`,
    deleteinstitution: (id: number) => `/institution/delete/${id}`,

}