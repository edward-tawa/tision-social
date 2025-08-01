import React, { useState } from 'react';
import { X, NotebookPen, Plus } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addInterest, addInterests } from '@/app/data/profile/interest/interestSlice';
import { InterestInterface } from '@/app/data/profile/interest/interestSlice';


interface createInterestProps {
    close: () => void
}


const CreateInterest: React.FC<createInterestProps> = ({ close }) => {
    const dispatch = useDispatch()
    const [interestInput, setInterestInput] = useState<string>("")
    const [interests, setInterests] = useState<InterestInterface[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterestInput(e.target.value)
    }
    const handleAddInterest = () => {
        const trimmedInput = interestInput.trim();
        if (!trimmedInput) return;

        const exists = interests.some(i => i.name.toLowerCase() === trimmedInput.toLowerCase());
        if (exists) return;

        const currentInterest: InterestInterface = {
            id: crypto.randomUUID(),
            name: trimmedInput,
        };
        setInterests([...interests, currentInterest]);
        setInterestInput("");
    };
    const handleRemoveInterest = (e: React.MouseEvent, index: number) => {
        setInterests(interests.filter(interest => interest !== interests[index]))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (interests.length === 1) {
            dispatch(addInterest(interests[0]))
        }
        else {
            dispatch(addInterests(interests))
        }
        setInterests([])
        setInterestInput("")
        close()



    }
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">

            <div className="flex justify-end">
                <X className="w-8 h-8 text-black cursor-pointer" onClick={close} />
            </div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Add Interest(s)
                </span>
            </h1>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Interest</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="interest"
                        value={interestInput}
                        onChange={handleChange}
                    />

                    <div className="flex flex-row gap-2">
                        {
                            (interests || []).map((interestt, index) => (
                                <div key={interestt.id} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div
                                        className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleRemoveInterest(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer" />
                                    </div>
                                    <div className="px-1">
                                        {interestt.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        type="button"
                        className="rounded-lg px-3 text-white bg-secondary hover:bg-primary w-full flex items-center gap-2 flex-row justify-center"
                        onClick={handleAddInterest}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-white" />
                    </button>

                </div>



                <button
                    type="submit"
                    disabled={interests.length === 0}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Save Interest(s)
                </button>
            </form>

        </div>
    )
}

export default CreateInterest