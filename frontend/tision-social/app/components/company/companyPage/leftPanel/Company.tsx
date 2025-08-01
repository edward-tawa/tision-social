import React from 'react'
import { Input } from '@headlessui/react'
import { Select } from '@headlessui/react'

const Company = () => {
    return (
        <div className="flex flex-col gap-y-8 sm:grid sm:grid-cols-12 rounded-lg bg-white text-text-color overflow-x-hidden py-2 px-2v gap-x-2">
            <form className="col-span-6">
                <div className="grid grid-cols-5 gap-y-3">
                    <label htmlFor="companyName" className="text-text-color col-span-2">Company Name</label>
                    <input type="text" name="company" placeholder="Company Name" className="rounded-lg col-span-2" />



                    <label htmlFor="companyName" className="text-text-color col-span-2">Company Name</label>
                    <input type="text" name="company" placeholder="Company Name" className="rounded-lg col-span-2" />



                    <label htmlFor="companyName" className="text-text-color col-span-2">Company Name</label>
                    <input type="text" name="company" placeholder="Company Name" className="rounded-lg col-span-2" />





                    <label htmlFor="companyName" className="text-text-color col-span-2">Organization Size</label>
                    <Select name="status" aria-label="Project status" className="bg-secondary text-white rounded-md col-span-2">
                        <option value="active" className="rounded-md">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                    </Select>

                    <label htmlFor="companyName" className="text-text-color col-span-2">Organization Type</label>
                    <Select name="status" aria-label="Project status" className="bg-secondary text-white rounded-md col-span-2">
                        <option value="active" className="rounded-md">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                    </Select>


                    <label htmlFor="companyName" className="text-text-color col-span-2">Tag Line</label>
                    <textarea name="company" placeholder="Company Name" rows={2} autoFocus className="rounded-lgcol-span-2" />

                </div>
            </form>



            <div className="col-span-5 text-text-color px-2 py-1">
                <div className="flex flex-col sm:grid sm:grid-cols-5 gap-y-3 rounded-lg ">
                    <p className="col-span-4">Company Name</p>
                    <p className="col-span-4">Company Type</p>
                    <p className="col-span-4">Company Location</p>
                    <p className="col-span-4">Number of employees</p>
                </div>
            </div>

        </div>
    )
}

export default Company