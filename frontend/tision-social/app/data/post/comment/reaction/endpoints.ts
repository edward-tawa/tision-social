
export const reactionEndPoints = {
    createreaction: "/reaction/add",
    getreactions: (id: number) => `/reaction/all/${id}`,
    getreaction: (id: number) => `/reaction/${id}`,
    updatereaction: (id: number) => `/reaction/update/${id}`,
    deletereaction: (id: number) => `/reaction/delete/${id}`,

}