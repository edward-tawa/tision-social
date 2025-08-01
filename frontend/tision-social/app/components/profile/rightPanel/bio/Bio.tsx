"use client";
import React, { useState } from 'react'
import { Pen, Plus } from "lucide-react";
import Link from "next/link";
import { BioInterface } from "@/app/data/profile/bio/bioSlice"
import CreateBio from "@/app/components/profile/rightPanel/bio/CreateBio"
import UpdateBio from "@/app/components/profile/rightPanel/bio/UpdateBio"
import {
  User,
  MapPin,
  FileText,
  Globe,
  Mail,
  Briefcase
} from "lucide-react";




const Bio: React.FC<BioInterface> = ({ id, name, location, email, description, website, employmentStatus }) => {
  const [createBio, setCreateBio] = useState<boolean>(false)
  const [updateBio, setUpdateBio] = useState<boolean>(false)
  const create = () => {
    setCreateBio(!createBio)
  }
  const update = () => {
    setCreateBio(!updateBio)
  }
  return (
    <div className="flex flex-col px-1 gap-2 py-2 bg-white rounded-lg w-full text-text-color min-h-30">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-text-color">Bio</h1>
        <div className="flex flex-row items-center gap-5">
          <Link href="#">
            <Plus className="w-6 h-6 text-text-color" onClick={create} />
          </Link>
          <Link href="#">
            <Pen className="w-5 h-5 text-text-color" onClick={update} />
          </Link>
        </div>

      </div>
      <div className="flex flex-col gap-2 w-full px-3 py-2 rounded-lg text-text-color">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold">Name</span>
          </div>
          <div className="px-6">{name}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold"> Location </span>
          </div>
          <div className="px-6">{location}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold">Description</span>
          </div>
          <div className="px-6">{description}</div>
        </div>

        <div className=" flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold">Website</span>
          </div>
          <div className="px-6">{website}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold">Email</span>
          </div>
          <div className="px-6">{email}</div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span className="text-text-color text-sm font-semibold">Employment</span>
          </div>
          <div className="px-6">{employmentStatus || "employ"}</div>
        </div>

      </div>
      {
        createBio && (
          <CreateBio handleClose={create} />
        )
      }

      {
        updateBio && (
          <UpdateBio close={() => setUpdateBio(!updateBio)} id={id} email={email} name={name} location={location} description={description} website={website} employmentStatus={employmentStatus} />
        )
      }
    </div>
  )
}

export default Bio