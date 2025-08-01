import { getProject, createProject, updateProject, deleteProject, getProjects } from "@/app/data/profile/project/api";

import { ProjectInterface } from "@/app/data/profile/project/projectSlice";


export const getProjectService = async (proId: number) => {
    return await getProject(proId);
}

export const getProjectsService = async (userId: number) => {
    return await getProjects(userId);
}

export const createProjectService = async (project: ProjectInterface) => {
    return await createProject(project);
}

export const updateProjectService = async (proId: number, project: Partial<ProjectInterface>) => {
    return await updateProject(proId, project);
}

export const deleteProjectService = async (proId: number) => {
    return await deleteProject(proId);
}