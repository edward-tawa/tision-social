"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { NotebookPen } from "lucide-react";
import { UserInterface, addUser } from '@/app/data/user/userSlice';


type FormFields = UserInterface & { confirmPassword: string };

const Signin: React.FC = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const password = watch("password");

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        const user: UserInterface = {
            id: Date.now(),
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            password: data.password,
        };

        dispatch(addUser(user));
        router.push("/");
    };

    return (
        <div className=" min-h-screen flex flex-col" style={{
            backgroundImage: 'url("/tisionsignin.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg p-4 border border-gray-200 flex flex-col gap-4 p-4 w-[90vw] sm:max-w-md mx-auto my-auto"
            >
                <div>
                    <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                        <NotebookPen className="w-6 h-6 text-secondary" />
                        <span>
                            Signin
                        </span>
                    </h1>
                </div>


                {/* Firstname */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        id="firstname"
                        type="text"
                        {...register("firstname", { required: "Firstname required" })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
                </div>

                {/* Lastname */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        id="lastname"
                        type="text"
                        {...register("lastname", { required: "Lastname required" })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
                </div>

                {/* Username */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: "Username required" })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Email required" })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password required",
                            minLength: { value: 8, message: "Minimum 8 characters" },
                        })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirm password required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    {isSubmitting ? "Submitting..." : (<p className="text-white ">Signin</p>)}
                </button>

                <button
                    type="button"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    {isSubmitting ? "Submitting..." : (<p className="text-white ">Google Signin</p>)}
                </button>


            </form>


        </div>
    );
};

export default Signin;
