import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectInterface } from "@/app/data/profile/project/types";
import {
    getProjectsThunk,
    getProjectThunk,
    createProjectThunk,
    updateProjectThunk,
    deleteProjectThunk,
} from '@/app/data/profile/project/thunk';





interface NormalizedProjects {
    byId: Record<number, ProjectInterface>,
    projectIds: number[]
}

interface ProjectsState {
    project: ProjectInterface,
    projects: NormalizedProjects,
    loading: boolean,
    error?: string,
}

export const initialState: ProjectsState = {
    project: {
        id: 0,
        userId: 0,
        title: "",
        description: "",
        role: "",
        repolInk: "",
        startDate: "",
        endDate: "",
        isOngoing: false,
    },
    projects: {
        byId: {},
        projectIds: []
    },
    loading: false,
    error: undefined,

};


const projectSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<ProjectInterface>) => {
            state.project = action.payload
        },

        addProject: (state, action: PayloadAction<ProjectInterface>) => {
            if (!state.projects.byId[action.payload.id]) {
                state.projects.byId[action.payload.id] = action.payload
                state.projects.projectIds.push(action.payload.id)
            }
        },

        addProjects: (state, action: PayloadAction<ProjectInterface[]>) => {
            action.payload.forEach(project => {
                if (!state.projects.byId[project.id]) {
                    state.projects.byId[project.id] = project
                    state.projects.projectIds.push(project.id)
                }
            })
        },

        updateProject: (state, action: PayloadAction<ProjectInterface>) => {
            if (state.projects.byId[action.payload.id] && state.projects.projectIds.includes(action.payload.id)) {
                state.projects.byId[action.payload.id] = action.payload
            }
        },

        deleteProject: (state, action: PayloadAction<number>) => {
            delete state.projects.byId[action.payload]
            state.projects.projectIds = state.projects.projectIds.filter(id => id !== action.payload)
        },

        resetProjectState: (state) => {
            state.project = {
                id: 0,
                userId: 0,
                title: "",
                description: "",
                role: "",
                repolInk: "",
                startDate: "",
                endDate: "",
                isOngoing: false,
            }
            state.projects.byId = {}
            state.projects.projectIds = []
        }
    },
    extraReducers: (builder) => {
        builder

            // CREATE
            .addCase(createProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                const project = action.payload;
                state.projects.byId[project.id] = project;
                if (!state.projects.projectIds.includes(project.id)) {
                    state.projects.projectIds.push(project.id);
                }
            })
            .addCase(createProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            // GET ONE
            .addCase(getProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                const project = action.payload;
                state.project = project;
                state.projects.byId[project.id] = project;
                if (!state.projects.projectIds.includes(project.id)) {
                    state.projects.projectIds.push(project.id);
                }
            })
            .addCase(getProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            // GET ALL
            .addCase(getProjectsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getProjectsThunk.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(project => {
                    state.projects.byId[project.id] = project;
                    if (!state.projects.projectIds.includes(project.id)) {
                        state.projects.projectIds.push(project.id);
                    }
                });
            })
            .addCase(getProjectsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            // UPDATE
            .addCase(updateProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                const project = action.payload;
                if (state.projects.byId[project.id]) {
                    state.projects.byId[project.id] = project;
                }
            })
            .addCase(updateProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            // DELETE
            .addCase(deleteProjectThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteProjectThunk.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                delete state.projects.byId[id];
                state.projects.projectIds = state.projects.projectIds.filter(pid => pid !== id);
            })
            .addCase(deleteProjectThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })
    }


})

export const { setProject, addProject, updateProject, deleteProject, resetProjectState, addProjects } = projectSlice.actions
export default projectSlice.reducer