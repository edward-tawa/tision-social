
export const scholarshipEndPoints = {
    createscholarship: "/scholarship/add",
    getscholarships: (id: number) => `/scholarship/all/${id}`,
    getscholarship: (id: number) => `/scholarship/${id}`,
    updatescholarship: (id: number) => `/scholarship/update/${id}`,
    deletescholarship: (id: number) => `/scholarship/delete/${id}`,

}