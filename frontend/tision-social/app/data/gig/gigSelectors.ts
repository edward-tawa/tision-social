import { RootState } from "@/app/data/store/store"
import { GigInterface } from "@/app/data/gig/types";


export const selectAllGigs = (state: RootState): GigInterface[] => {
    const { gigIds, byId } = state.gigSlice.gigs
    return gigIds.map(gigId => byId[gigId])
}


export const selectGigById = (state: RootState, gigId: number): GigInterface | undefined => {
    const { gigIds, byId } = state.gigSlice.gigs
    if (!gigIds.includes(gigId)) return
    return byId[gigId]
}


export const selectCurrentGig = (state: RootState): GigInterface => {
    return state.gigSlice.gig
}
