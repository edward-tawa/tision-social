
export const messageEndPoints = {
    createmessage: "/message/add",
    getmessages: (id: number) => `/message/all/${id}`,
    getmessage: (id: number) => `/message/${id}`,
    updatemessage: (id: number) => `/message/update/${id}`,
    deletemessage: (id: number) => `/message/delete/${id}`,

}