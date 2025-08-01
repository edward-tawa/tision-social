
export const gigEndPoints = {
    creategig: "/gig/add",
    getgigs: (id: number) => `/gig/all/${id}`,
    getgig: (id: number) => `/gig/${id}`,
    updategig: (id: number) => `/gig/update/${id}`,
    deletegig: (id: number) => `/gig/delete/${id}`,

}