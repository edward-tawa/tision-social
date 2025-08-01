import {
    getInterest,
    createInterest,
    updateInterest,
    deleteInterest,
    getInterests
} from "@/app/data/profile/interest/api";

import { InterestInterface } from "@/app/data/profile/interest/interestSlice";


export const getInterestService = async (interestId: number) => {
    return await getInterest(interestId);
}

export const getInterestsService = async (userId: number) => {
    return await getInterests(userId);
}

export const createInterestService = async (interest: InterestInterface) => {
    return await createInterest(interest);
}

export const updateInterestService = async (interestId: number, interest: Partial<InterestInterface>) => {
    return await updateInterest(interestId, interest);
}

export const deleteInterestService = async (interestId: number) => {
    return await deleteInterest(interestId);
}