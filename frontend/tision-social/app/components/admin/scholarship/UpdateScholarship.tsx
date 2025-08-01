import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { X, NotebookPen, Plus } from "lucide-react";
import { updateScholarship } from "@/app/data/scholarship/scholarshipSlice";
import { useDispatch } from 'react-redux';
import { ScholarshipInterface } from "@/app/data/scholarship/scholarshipSlice";

// interface ScholarshipInterface {
//     id: number;
//     posterId: number;
//     name: string;
//     description: string;
//     requirements: string[];
//     deadline: string;
//     amount: number;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

interface CloseProps {
    close: () => void;
}
type UpdateProps = CloseProps & ScholarshipInterface

const UpdateScholarship: React.FC<UpdateProps> = ({ id, posterId, name, description, requirements, deadline, amount, isActive, createdAt, updatedAt, close }) => {
    const dispatch = useDispatch();
    const [reqInput, setReqInput] = useState<string>("");
    const [reqs, setReqs] = useState<string[]>(requirements)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ScholarshipInterface>({
        defaultValues: {
            id, posterId, name, description, requirements, deadline, amount, isActive,
            createdAt: createdAt.slice(0, 10), updatedAt: updatedAt.slice(0, 10)
        }
    })

    const onSubmit: SubmitHandler<ScholarshipInterface> = (data) => {
        const scholarship: ScholarshipInterface = {
            id,
            posterId,
            name: data.name,
            description: data.description,
            requirements: reqs, // Convert string to array
            deadline: data.deadline,
            amount: data.amount,
            isActive: true, // Assuming new scholarships are active by default
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }
        dispatch(updateScholarship(scholarship))
        close()
    }

    const handleAddReq = (e: React.MouseEvent) => {
        e.preventDefault();
        if (reqInput.trim() !== "") {
            setReqs([...reqs, reqInput.trim()]);
            setReqInput("");
        }
    }

    //for removing string from technologies array in UI
    const handleReqRemove = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const newReqs = [...reqs];
        newReqs.splice(index, 1);
        setReqs(newReqs);
    };

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">

            <h2 className="font-bold flex gap-2">
                <NotebookPen className="w-4 h-4 text-black cursor-pointer" />Update Scholarship
            </h2>
            <form className="flex flex-col gap-3 text-text-color" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Name">Scholarship Name</label>
                    <input type="text" placeholder="Scholarship name"    {...register("name", { required: "Enter Scholarship name" })} />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}


                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Location">Description</label>
                    <input type="text" placeholder="Location" {...register("description", { required: "Enter Scholarship description" })} />
                </div>
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Requirements">Requirements</label>
                    <input
                        value={reqInput}
                        onChange={(e) => setReqInput(e.target.value)}
                        placeholder="Enter requirement"
                    />
                    <div className="flex flex-row gap-2">
                        {
                            reqs.map((req, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleReqRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer"
                                        />
                                    </div>
                                    <div className="px-1">
                                        {req}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        type="button"
                        className="rounded-lg px-3 text-white bg-secondary hover:bg-primary flex items-center gap-2 flex-row justify-center"
                        onClick={handleAddReq}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-white" />
                    </button>

                </div>


                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Stipend Amount</label>
                    <input type="number" placeholder="Stipend Amount" {...register("amount", {
                        required: "Enter Stipend",
                        valueAsNumber: true
                    })} />
                </div>

                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Date Posted</label>
                    <input type="date"  {...register("createdAt", { required: "Enter date posted" })} />
                </div>

                {errors.createdAt && <p className="text-red-500 text-sm">{errors.createdAt.message}</p>}

                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {
                        isSubmitting ? "Submitting" : "Update Scholarship"
                    }
                </button>

            </form>
        </div>
    )
}

export default UpdateScholarship