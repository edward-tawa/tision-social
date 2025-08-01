import React from 'react';
import { Input } from '@headlessui/react'
import { Select } from '@headlessui/react'
import Button from "../buttons/Button";

const JobFilter = () => {
  return (
    <div className="flex flex-col w-full rounded-lg bg-white text-text-color mt-1 overflow-x-hidden">
      <div className="border border-gray-400 rounded-lg">
        <div className="flex flex-col items-center justify-between gap-3 px-2 py-2">
          <h1 className="font-bold text-text-color justify-start">Job Filter</h1>
          <div className="text-text-color flex flex-row items-center w-full justify-between">
            <h2 className="">Job Title</h2>
            <input type="text" placeholder="Job title" className="bg-primary rounded-md text-black px-1" />
          </div>
          <div className="text-text-color flex flex-row items-center w-full justify-between">
            <h2 className="">Job Location</h2>
            <input type="text" placeholder="Job title" className="bg-primary rounded-md text-black px-1" />
          </div>
          <div className="text-text-color flex flex-row items-center w-full justify-between">
            <h2 className="">Job Type</h2>
            <Select name="status" aria-label="Project status" className="bg-secondary text-white rounded-md">
              <option value="active" className="rounded-md">Active</option>
              <option value="paused">Paused</option>
              <option value="delayed">Delayed</option>
              <option value="canceled">Canceled</option>
            </Select>
          </div>

          <Button text="Filter" size="small" color="secondary" className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default JobFilter