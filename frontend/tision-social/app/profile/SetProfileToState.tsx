import React from 'react'
'use client'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BioInterface } from '@/app/data/profile/bio/bioSlice'
import { ExperienceInterface } from '@/app/data/profile/experience/experienceSlice'
import { EducationInterface } from '@/app/data/profile/education/types'
import { ProjectInterface } from '@/app/data/profile/project/projectSlice'
import { InterestInterface } from '@/app/data/profile/interest/interestSlice'
import { addBio } from "@/app/data/profile/bio/bioSlice"
import { addExperience } from "@/app/data/profile/experience/experienceSlice"
import { addEducation, addEducations } from "@/app/data/profile/education/educationSlice"
import { addUsers } from "@/app/data/user/userSlice"
import { addProject } from "@/app/data/profile/project/projectSlice"
import { addInterest } from "@/app/data/profile/interest/interestSlice"
import { dummyEducations } from "@/app/data/profile/education/dummyEducation"
import { dummyPublicUsers } from "@/app/data/user/dummyUsers"

interface setProfileToStateProps {
    bio?: BioInterface;
    experience?: ExperienceInterface;
    education?: EducationInterface;
    project?: ProjectInterface;
    interest?: InterestInterface;

}


const SetProfileToState: React.FC<setProfileToStateProps> = ({ bio, experience, education, interest, project }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (bio) dispatch(addBio(bio));
        if (experience) dispatch(addExperience(experience));
        if (education) dispatch(addEducation(education));
        if (project) dispatch(addProject(project));
        if (interest) dispatch(addInterest(interest));

        dispatch(addEducations(dummyEducations))
        dispatch(addUsers(dummyPublicUsers))
    }, [bio, experience, education, project, interest, dispatch])

    return null;
}

export default SetProfileToState