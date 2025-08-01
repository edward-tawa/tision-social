
export const bioEndPoints = {
    createbio: "/bio/add",
    getbios: (id: number) => `/bio/all/${id}`,
    getbio: (id: number) => `/bio/${id}`,
    updatebio: (id: number) => `/bio/update/${id}`,
    deletebio: (id: number) => `/bio/delete/${id}`,

}