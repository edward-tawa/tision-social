
export const connectionEndPoints = {
    createconnection: "/connection/add",
    getconnections: (id: number) => `/connection/all/${id}`,
    getconnection: (id: number) => `/connection/${id}`,
    updateconnection: (id: number) => `/connection/update/${id}`,
    deleteconnection: (id: number) => `/connection/delete/${id}`,

}