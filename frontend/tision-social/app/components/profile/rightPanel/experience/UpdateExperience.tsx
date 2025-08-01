"use client";
import React, { useState } from "react";
import { X, NotebookPen } from "lucide-react";
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateExperience } from '@/app/data/profile/experience/experienceSlice';
import { ExperienceInterface } from "@/app/data/profile/experience/experienceSlice";

interface CloseProps {
  close: () => void;
}



type UpdateExperienceProps = ExperienceInterface & CloseProps;
const UpdateExperience: React.FC<UpdateExperienceProps> = ({
  id,
  company,
  role,
  location,
  startDate,
  endDate,
  description,
  technologies,
  close,
}) => {

  const dispatch = useDispatch();
  const [techInput, setTechInput] = useState<string>("");
  const [techs, setTechs] = useState<string[]>(technologies);
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [descriptions, setDescriptions] = useState<string[]>(description);
  const [experience, setExperience] = useState<ExperienceInterface>({
    id,
    company,
    role,
    location,
    startDate,
    endDate,
    description,
    technologies,
  });



  //handle change on the fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "description") {
      setDescriptionInput(e.target.value);
      return
    }

    if (e.target.name === "technology") {
      setTechInput(e.target.value);
      return
    }

    const newUpdatedExp = {
      ...experience,
      technologies: techs,
      description: descriptions,
      [e.target.name]: e.target.value
    }

    setExperience(newUpdatedExp)

  }

  const handleAddDescription = () => {
    if (descriptionInput && !descriptions.includes(descriptionInput)) {
      setDescriptions([...descriptions, descriptionInput]);
    }
    setDescriptionInput("");
  }

  //remove a description
  const handleDescriptionRemove = (e: React.MouseEvent, index: number) => {
    setDescriptions(descriptions.filter(desc => desc !== descriptions[index]))
  }

  //add technology to the array
  const handleAddTechnology = () => {
    if (techInput && !techs.includes(techInput)) {
      setTechs([...techs, techInput]);
    }
    setTechInput("");
  }

  //remove a technology
  const handleTechRemove = (e: React.MouseEvent, index: number) => {
    setTechs(techs.filter(tech => tech !== techs[index]));
  }

  //handle Submit and close modal 

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateExperience({
      ...experience,
      description: descriptions,
      technologies: techs,
    }));
    setDescriptions([]);
    setTechs([])
    close()
  }



  //clear states

  return (
    <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-end">
        <X className="w-8 h-8" onClick={close} />
      </div>
      <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
        <NotebookPen className="w-6 h-6 text-secondary" />
        <span>Edit Experience</span>
      </h1>
      <form className="flex flex-col gap-1" onSubmit={handleClose}>

        <div className="flex flex-col gap-1">
          <label>Company</label>
          <input
            type="text"
            className="border border-gray-200 w-full px-1 rounded-lg"
            name="company"
            value={experience.company}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Role</label>
          <input
            type="text"
            className="border border-gray-200 w-full px-1 rounded-lg"
            name="role"
            value={experience.role}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Location</label>
          <input
            type="text"
            className="border border-gray-200 w-full px-1 rounded-lg"
            name="location"
            value={experience.location}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Start Date</label>
          <input
            type="text"
            className="border border-gray-200 w-full px-1 rounded-lg"
            name="startDate"
            value={experience.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>End Date</label>
          <input
            type="text"
            className="border border-gray-200 w-full px-1 rounded-lg"
            name="endDate"
            value={experience.endDate}
            onChange={handleChange}
          />
        </div>

        {/**Description */}
        <div className="flex flex-col gap-1">
          <label>Describe Work Done</label>
          <textarea
            className="border border-gray-200 w-full p-1 rounded-lg"
            name="description"
            value={descriptionInput}
            rows={2}
            onChange={handleChange}
          />
          <div className="flex flex-row flex-wrap gap-2">
            {
              descriptions.map((desc, index) => (
                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                  <div
                    className="flex justify-end p-[0.3px]"
                    onClick={(e) => { handleDescriptionRemove(e, index) }}

                  >
                    <X className="w-3 h-3 text-black cursor-pointer" />
                  </div>
                  <div className="px-1">
                    {desc}
                  </div>
                </div>
              ))
            }
          </div>
          <button
            type="button"
            className="rounded-lg px-3 text-text-color bg-secondary hover:bg-primary flex items-center gap-2 w-full justify-center"
            onClick={handleAddDescription}
          >
            <span>Add</span><Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/**technology */}
        <div className="flex flex-col flex-wrap gap-1">
          <label>Technologies</label>
          <input
            type="text"
            className="border border-gray-200 w-full p-1 rounded-lg"
            name="technology"
            value={techInput}
            onChange={handleChange}
          />
          <div className="flex flex-row gap-2">
            {
              techs.map((tech, index) => (
                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                  <div className="flex justify-end p-[0.3px]"
                    onClick={(e) => { handleTechRemove(e, index) }}
                  >
                    <X className="w-3 h-3 text-black cursor-pointer"
                    />
                  </div>
                  <div className="px-1">
                    {tech}
                  </div>
                </div>
              ))
            }
          </div>
          <button
            type="button"
            className="rounded-lg px-3 text-text-color bg-secondary hover:bg-primary flex items-center gap-2 w-full justify-center"
            onClick={handleAddTechnology}
          >
            <span>Add</span><Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Experience
        </button>
      </form>
    </div>
  )
}

export default UpdateExperience