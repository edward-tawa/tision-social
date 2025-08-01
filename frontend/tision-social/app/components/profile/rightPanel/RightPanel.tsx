"use client";
import React from 'react'
import Bio from "./bio/Bio";
import Activity from "./Activity";
import { useSelector } from 'react-redux';
import { RootState } from "@/app/data/store/store";
import ExperienceList from "@/app/components/profile/rightPanel/experience/ExperienceList";
import EducationList from "@/app/components/profile/rightPanel/education/EducationList";
import ProjectList from "@/app/components/profile/rightPanel/projects/ProjectList";
import InterestList from "@/app/components/profile/rightPanel/interests/InterestList";


const RightPanel = () => {
    const { bio } = useSelector((state: RootState) => state.bioSlice)
    const { experiences } = useSelector((state: RootState) => state.experienceSlice)
    const { educations } = useSelector((state: RootState) => state.educationSlice)
    const { projects } = useSelector((state: RootState) => state.projectSlice)

    const { interests } = useSelector((state: RootState) => state.interestSlice)
    return (
        <div className="sm:flex sm:flex-col rounded px-1 py-1 gap-y-4 bg-primary">
            <Bio  {...bio} />
            <ExperienceList experiences={experiences} />
            <EducationList educations={educations} />
            <ProjectList projects={projects} />
            <InterestList interests={interests} />
            <Activity />
        </div>
    )
}

export default RightPanel