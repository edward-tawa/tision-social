
export const projectEndPoints = {
    createproject: "/project/add",
    getprojects: (id: number) => `/project/all/${id}`,
    getproject: (id: number) => `/project/${id}`,
    updateproject: (id: number) => `/project/update/${id}`,
    deleteproject: (id: number) => `/project/delete/${id}`,

}