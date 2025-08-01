"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import { NotebookPen } from "lucide-react";

interface SigninCloseProps {
    close: () => void;
}

type FormFields = {
    username: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    const password = watch("password");

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        const userInfo: FormFields = {
            username: data.username,
            password: data.password

        };

        // dispatch(user login);
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
                            Login
                        </span>
                    </h1>
                </div>

                {/* Username / Email */}
                <div className="flex flex-col gap-1">
                    <input
                        id="username"
                        type="text"
                        placeholder="Username / Email"
                        {...register("username", {
                            required: "Username or Email is required",
                            validate: (value) => {
                                const isEmail = value.includes("@") && value.includes(".");
                                const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);

                                if (isEmail || isUsername) return true;
                                return "Enter a valid username or email";
                            },
                        })}
                        className="border px-2 py-1 rounded-md"
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
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


                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    {isSubmitting ? "Submitting..." : (<p className="text-white ">Login</p>)}
                </button>


                <button
                    type="button"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    {isSubmitting ? "Submitting..." : (<p className="text-white ">Google Login</p>)}
                </button>


            </form>


        </div>
    );
};

export default Login;
