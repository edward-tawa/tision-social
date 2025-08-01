"use client";
import { useState } from 'react'
import React from 'react';
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectInterface } from '@/app/data/profile/project/projectSlice';
import Project from "@/app/components/profile/rightPanel/projects/Project"
import CreateProject from "@/app/components/profile/rightPanel/projects/CreateProject"

interface ProjectListProps {
    projects: ProjectInterface[]
}
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const handleClose = () => {
        setOpenCreate(!openCreate)
    }
    return (
        <div className="flex flex-col gap-1 bg-white rounded-lg px-2">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-text-color">Projects</h1>
                <div className="flex justify-end items-center">
                    <Link href="#">
                        <Plus className="w-6 h-6 text-text-color" onClick={handleClose} />
                    </Link>
                </div>

            </div>
            <div>
                {
                    projects.map((project, index) => (
                        <Project key={index} {...project} />
                    ))
                }
            </div>

            <div>
                {
                    openCreate && (
                        <CreateProject handleClose={handleClose} />
                    )
                }
            </div>
        </div>
    )
}

export default ProjectList