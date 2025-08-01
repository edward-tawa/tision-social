
export const commentEndPoints = {
    createcomment: "/comment/add",
    getcomments: (id: number) => `/comment/all/${id}`,
    getcomment: (id: number) => `/comment/${id}`,
    updatecomment: (id: number) => `/comment/update/${id}`,
    deletecomment: (id: number) => `/comment/delete/${id}`,

}