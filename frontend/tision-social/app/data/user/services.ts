//service layer
import { createUser } from "@/app/data/user/api";
import { getUser } from "@/app/data/user/api";
import { getUsers } from "@/app/data/user/api";
import { updateUser } from "@/app/data/user/api";
import { deleteUser } from "@/app/data/user/api";
import { UserInterface } from "@/app/data/user/types";


export const createUserService = async (data: UserInterface) => {
    return await createUser(data);
}

export const getUserService = async (userId: number) => {
    return await getUser(userId);
}

export const getUsersService = async (page: number, pageSize: number) => {
    return await getUsers(page, pageSize);
}

export const updateUserService = async (userId: number, userData: Partial<UserInterface>) => {
    return await updateUser(userId, userData);
}

export const deleteUserService = async (userId: number) => {
    return await deleteUser(userId);
}



