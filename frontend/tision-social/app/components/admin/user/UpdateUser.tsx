import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInterface } from '@/app/data/user/userSlice';
import { useDispatch } from 'react-redux';
import { setUser, updateUser } from '@/app/data/user/userSlice';


type formFields = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface closeProps {
    close: () => void
}

type UpdateProps = UserInterface & closeProps

const UpdateUser: React.FC<UpdateProps> = ({ id, firstname, lastname, username, email, password, close }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<formFields>({
        defaultValues: {
            firstname, lastname, username, email, password
        }
    });
    const onSubmit: SubmitHandler<formFields> = async (data) => {
        const { firstname, lastname, username, email, password } = data
        const user: UserInterface = {
            firstname,
            lastname,
            username,
            email,
            password,
            id: Date.now(),
        }
        dispatch(setUser(user))
        dispatch(updateUser(user))
        close()

    };
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1" >
                    <label>Firstname</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("firstname", { required: "Firstname is required" })}
                    />
                </div>
                {errors.firstname && (<div className="text-red-500 ">{errors.firstname.message}</div>)}

                <div className="flex flex-col gap-1">
                    <label>Lastname</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("lastname", { required: "Lastname is required" })}

                    />
                </div>
                {errors.lastname && (<div className="text-red-500 ">{errors.lastname.message}</div>)}

                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("username", { required: "Username is required" })}
                    />
                </div>
                {errors.username && (<div className="text-red-500 ">{errors.username.message}</div>)}

                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input
                        type="email"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("email",
                            {
                                required: "Email is required",
                                validate: value => {
                                    if (!value.includes("@")) {
                                        return 'Email must contain @'
                                    }
                                    else {
                                        return true
                                    }
                                }
                            })}
                    />
                </div>
                {errors.email && (<div className="text-red-500 ">{errors.email.message}</div>)}

                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input
                        type="password"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("password", { required: "Password is required", minLength: 8, maxLength: 20 })}

                    />
                </div>
                {errors.password && (<div className="text-red-500 ">{errors.password.message}</div>)}

                <div className="flex flex-col gap-1">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        {...register("passwordConfirm", { required: "Confirm password", minLength: 8, maxLength: 20 })}
                    />
                </div>
                {errors.passwordConfirm && (<div className="text-red-500 ">{errors.passwordConfirm.message}</div>)}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating user" : "Create User"}
                </button>
            </form>

        </div>
    )
}

export default UpdateUser