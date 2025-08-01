//api.ts
import api from "@/app/data/utils/axios";
import { UserInterface } from "@/app/data/user/types";
import { PublicUser } from "@/app/data/user/types";
import { userEndPoints } from "@/app/data/user/endpoints";


export const createUser = async (userData: UserInterface): Promise<PublicUser> => {
    try {
        const res = await api.post(userEndPoints.createuser, userData);
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the user");
    }
}

export const getUsers = async (page = 1, pageSize = 20): Promise<{ users: PublicUser[], count: number }> => {
    try {
        const res = await api.get(userEndPoints.getusers, { params: { page, page_size: pageSize } });
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "An error occurred while fetching users");
    }
}


export const getUser = async (userId: number): Promise<PublicUser> => {
    try {
        const res = await api.get(userEndPoints.getuser(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "An error occurred while fetching the user");
    }
}

export const updateUser = async (userId: number, userData: Partial<UserInterface>): Promise<PublicUser> => {
    try {
        const res = await api.patch(userEndPoints.updateuser(userId), userData);
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating user");
    }
}

export const deleteUser = async (userId: number): Promise<number> => {
    try {
        const res = await api.delete(userEndPoints.deleteuser(userId));
        return res.status;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting user");
    }
}