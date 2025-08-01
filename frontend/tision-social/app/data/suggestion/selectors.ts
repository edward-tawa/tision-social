import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";
import { PublicUser } from "@/app/data/user/types";


const selectAllUsers = (state: RootState) => {
    return state.userSlice.users.userIds.map(id => state.userSlice.users.byId[id])
}
const selectUserById = (state: RootState, userId: number) => {
    return state.userSlice.users.byId[userId];
}
const selectBioByUserId = (state: RootState, userId: number) => {
    return state.bioSlice.bios.find(bio => bio.userId === userId)
}
const selectExperienceByUserId = (state: RootState, userId: number) => {
    return state.experienceSlice.experiences.exIds.map(id => state.experienceSlice.experiences.byId[id])
        .filter(experience => experience.userId === userId)
}

const selectEducationByUserId = (state: RootState, userId: number) => {
    return state.educationSlice.educations.eduIds.map(id => state.educationSlice.educations.byId[id])
        .filter(education => education.userId === userId)
}

const selectProjectsByUserId = (state: RootState, userId: number) => {
    return state.projectSlice.projects.projectIds.map(id => state.projectSlice.projects.byId[id])
        .filter(project => project.userId === userId)
}
const selectInterestsByUserId = (state: RootState, userId: number) => {
    return state.interestSlice.interests.interestIds.map(id => state.interestSlice.interests.byId[id])
        .filter(interest => interest.userId === userId)
}


const selectAllBios = (state: RootState) => {
    return state.bioSlice.bios;
}

const selectAllExperiences = (state: RootState) => {
    return state.experienceSlice.experiences.exIds.map(id => state.experienceSlice.experiences.byId[id]);
}

const selectAllEducations = (state: RootState) => {
    return state.educationSlice.educations.eduIds.map(id => state.educationSlice.educations.byId[id]);
}

const selectAllInterests = (state: RootState) => {
    return state.interestSlice.interests.interestIds.map(id => state.interestSlice.interests.byId[id]);
}

const selectAllProjects = (state: RootState) => {
    return state.projectSlice.projects.projectIds.map(id => state.projectSlice.projects.byId[id]);
}


export const usersWithProfile = createSelector(
    [selectAllUsers, selectAllBios, selectAllExperiences, selectAllEducations, selectAllInterests, selectAllProjects],
    (users, bios, experiences, educations, interests, projects) => {
        return users.map(user => {
            return {
                ...user,
                profile: {
                    bio: bios.find(bio => bio.userId === user.id) || null,
                    experience: experiences.filter(exp => exp.userId === user.id) || [],
                    education: educations.filter(edu => edu.userId === user.id) || [],
                    interests: interests.filter(interest => interest.userId === user.id) || [],
                    projects: projects.filter(project => project.userId === user.id) || [],
                }
            }
        })
    }
);


export const interestToUserIdMap = createSelector(
    [usersWithProfile],
    (users) => {
        const interestToUserMap: Record<string, Set<PublicUser>> = {}
        users.forEach(user => {
            user.profile.interests.forEach(interest => {
                if (!interestToUserMap[interest.name]) {
                    interestToUserMap[interest.name] = new Set();
                }
                interestToUserMap[interest.name].add(user);
            })
        })

        return interestToUserMap;
    }
)


export const userswithSameInterests = createSelector(
    [usersWithProfile, interestToUserIdMap],
    (users, IntrestToUserMap) => {
        const relatedUsers = new Set<PublicUser>();
        users.forEach(user => {
            user.profile.interests.forEach(interest => {
                if (IntrestToUserMap[interest.name]) {
                    IntrestToUserMap[interest.name].forEach(userr => {
                        if (userr.id !== user.id) {
                            relatedUsers.add(userr);
                        }
                    })
                }

            })
        })

        return [...relatedUsers]
    }
)

export const userToUsersMap = createSelector(
    [usersWithProfile],
    (users) => {
        const userToUsersMap: Record<number, Set<PublicUser>> = {};
        users.forEach(user => {
            const userInstitions: string[] = user.profile.education.map(education => education.institution)
            users.forEach(otherUser => {
                if (user.id !== otherUser.id) {
                    otherUser.profile.education.forEach(edu => {
                        if (userInstitions.includes(edu.institution)) {
                            if (!userToUsersMap[user.id]) {
                                userToUsersMap[user.id] = new Set();
                            }
                            userToUsersMap[user.id].add(otherUser);
                        }
                    })
                }
            })
        })

        return userToUsersMap
    }
)


export const usersWithSameInstitutionMap = createSelector(
    [usersWithProfile],
    (users) => {
        const institutionToAttendeesMap: Record<string, Set<PublicUser>> = {}
        users.forEach(user => {
            user.profile.education.forEach(education => {
                if (!institutionToAttendeesMap[education.institution]) {
                    institutionToAttendeesMap[education.institution] = new Set()
                }
                institutionToAttendeesMap[education.institution].add(user);
            })
        })

        return institutionToAttendeesMap
    }
)


export const usersWithSameInstitution = (userId: number) => createSelector(
    [usersWithProfile, usersWithSameInstitutionMap],
    (users, institutionUserMap) => {
        const usersWithSameInstitution = new Set<PublicUser>()
        const currentUser = users.find(user => user.id === userId);
        currentUser?.profile.education.forEach(education => {
            if (institutionUserMap[education.institution]) {
                institutionUserMap[education.institution].forEach(user => {
                    if (user.id !== userId) {
                        usersWithSameInstitution.add(user);
                    }

                })
            }
        })

        return [...usersWithSameInstitution]
    }
)

