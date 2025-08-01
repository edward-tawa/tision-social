
export const suggestionEndPoints = {
    createsuggestion: "/suggestion/signin",
    getsuggestions: "/suggestion/all",
    getsuggestion: (id: number) => `/suggestion/${id}`,
    updatesuggestion: (id: number) => `/suggestion/update/${id}`,
    deletesuggestion: (id: number) => `/suggestion/delete/${id}`,

}