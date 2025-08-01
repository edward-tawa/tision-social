import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { X, NotebookPen, Plus } from "lucide-react";
import { InstitutionInterface } from "@/app/data/store/slices/institution/institutionSlice";
import { updateInstitution } from "@/app/data/store/slices/institution/institutionSlice";
import { useDispatch } from 'react-redux';

interface CloseProps {
    close: () => void;
}

type UpdateInstitutionProps = InstitutionInterface & CloseProps;

const UpdateInstitution: React.FC<UpdateInstitutionProps> = ({ id, userId, name, location, offers, close }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InstitutionInterface>({
        defaultValues: { name, location, offers }
    });
    const [offerInput, setOfferInput] = useState<string>("");
    const [offars, setOffars] = useState<string[]>(offers || []);


    const onSubmit: SubmitHandler<InstitutionInterface> = (data) => {
        const institution: InstitutionInterface = {
            id: Date.now(),
            userId: 0, // Assuming you will set this later
            name: data.name,
            location: data.location,
            offers: offers,
        }
        // Dispatch the action to add the institution
        dispatch(updateInstitution(institution));
        setOfferInput("");
        setOffars([]);
        close();
    }

    const handleAddOffer = (e: React.MouseEvent) => {
        e.preventDefault();
        if (offerInput.trim() !== "") {
            setOffars([...offers, offerInput.trim()]);
            setOfferInput("");
        }
    }

    //for removing string offer array in UI
    const handleOfferRemove = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const newOffers = [...offers];
        newOffers.splice(index, 1);
        setOffars(newOffers);
    };

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <h2 className="font-bold flex gap-2">
                <NotebookPen className="w-4 h-4 text-black cursor-pointer" />
                <span>Create Scholarship</span>
            </h2>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Institution Name</label>
                    <input type="text" {...register("name", { required: "Name required" })} />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <div className="flex flex-col gap-1">
                    <label htmlFor="location">Location</label>
                    <input type="text" {...register("location", { required: "Location required" })} />
                </div>
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                <div className="flex flex-col gap-1">
                    <label htmlFor="contact">Offers</label>
                    <input
                        type="tel"
                        value={offerInput}
                        onChange={(e) => setOfferInput(e.target.value)}
                    />

                    <div className="flex flex-row gap-2">
                        {
                            offers.map((offer, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleOfferRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer"
                                        />
                                    </div>
                                    <div className="px-1">
                                        {offer}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        type="button"
                        className="rounded-lg px-3 text-white bg-secondary hover:bg-primary flex items-center gap-2 flex-row justify-center"
                        onClick={handleAddOffer}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-white" />
                    </button>
                </div>

                <button type="submit">Create Institution</button>
            </form>
        </div >
    )
}

export default UpdateInstitution