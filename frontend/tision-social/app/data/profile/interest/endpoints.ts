
export const interestEndPoints = {
    createinterest: "/interest/add",
    getinterests: (id: number) => `/interest/all/${id}`,
    getinterest: (id: number) => `/interest/${id}`,
    updateinterest: (id: number) => `/interest/update/${id}`,
    deleteinterest: (id: number) => `/interest/delete/${id}`,

}