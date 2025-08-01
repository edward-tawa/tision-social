
export const eventEndPoints = {
    createevent: "/event/add",
    getevents: (id: number) => `/event/all/${id}`,
    getevent: (id: number) => `/event/${id}`,
    updateevent: (id: number) => `/event/update/${id}`,
    deleteevent: (id: number) => `/event/delete/${id}`,

}