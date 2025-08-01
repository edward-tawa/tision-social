
export const educationEndPoints = {
    createeducation: "/education/add",
    geteducations: (id: number) => `/education/all/${id}`,
    geteducation: (id: number) => `/education/${id}`,
    updateeducation: (id: number) => `/education/update/${id}`,
    deleteeducation: (id: number) => `/education/delete/${id}`,

}