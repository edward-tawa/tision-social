//api.ts
import api from "@/app/data/utils/axios";
import { ProjectInterface } from "@/app/data/profile/project/projectSlice";
import { projectEndPoints } from "@/app/data/profile/project/endpoints";

export const createProject = async (Project: ProjectInterface): Promise<ProjectInterface> => {
    try {
        const res = await api.post(projectEndPoints.createproject, Project);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Project");
    }
}

export const getProject = async (proId: number): Promise<ProjectInterface> => {
    try {
        const res = await api.get(projectEndPoints.getproject(proId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Project");
    }
}

export const getProjects = async (userId: number): Promise<ProjectInterface[]> => {
    try {
        const res = await api.get(projectEndPoints.getprojects(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Projects");
    }
}

export const updateProject = async (proId: number, Project: Partial<ProjectInterface>): Promise<ProjectInterface> => {
    try {
        const res = await api.patch(projectEndPoints.updateproject(proId), Project)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Project");
    }
}


export const deleteProject = async (proId: number): Promise<number> => {
    try {
        const res = await api.delete(projectEndPoints.deleteproject(proId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Project");
    }
}
