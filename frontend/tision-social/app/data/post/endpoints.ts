
export const postEndPoints = {
    createpost: "/post/add",
    getposts: (id: number) => `/post/all/${id}`,
    getpost: (id: number) => `/post/${id}`,
    updatepost: (id: number) => `/post/update/${id}`,
    deletepost: (id: number) => `/post/delete/${id}`,

}