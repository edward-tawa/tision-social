
export const experienceEndPoints = {
    createexperience: "/experience/add",
    getexperiences: (id: number) => `/experience/all/${id}`,
    getexperience: (id: number) => `/experience/${id}`,
    updateexperience: (id: number) => `/experience/update/${id}`,
    deleteexperience: (id: number) => `/experience/delete/${id}`,

}