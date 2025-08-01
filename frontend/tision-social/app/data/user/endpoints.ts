
export const userEndPoints = {
    createuser: "/user/signin",
    getusers: "/user/all",
    getuser: (id: number) => `/user/${id}`,
    updateuser: (id: number) => `/user/update/${id}`,
    deleteuser: (id: number) => `/user/delete/${id}`,

}