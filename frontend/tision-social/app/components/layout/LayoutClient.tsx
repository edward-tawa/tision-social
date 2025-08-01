"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/components/navigation/Navbar";
import FloatingIcon from '@/app/components/chat/FloatingChatIcon';
import { AppDispatch } from "@/app/data/store/store";
import { getUserId } from "@/app/data/user/utils/getUserId";
import { currentUserSelector } from "@/app/data/auth/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingDots from "@/app/components/loading/LoadingDots";
import { dummyEducations } from "@/app/data/profile/education/dummyEducation"
import { dummyPublicUsers } from "@/app/data/user/dummyUsers"
import { addEducation, addEducations } from "@/app/data/profile/education/educationSlice"
import { addUsers } from "@/app/data/user/userSlice"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(currentUserSelector);
    // Add all paths where you want to hide the Navbar
    const noNavbarPaths = ["/login", "/signin", "/auth/callback"];

    const hideNavbar = noNavbarPaths.includes(pathname);


    const userId = getUserId();
    //useEffect to get user and set him in state to test authentication.


    useEffect(() => {
        // const fetchUser = async () => {
        //     try {
        //         if (userId) {
        //             await dispatch(getUserThunk(userId)).unwrap();
        //         }
        //         else {
        //             router.push("/");
        //         }
        //     }
        //     catch (error) {
        //         router.push("/login");
        //     }
        // }

        // fetchUser();

        dispatch(addEducations(dummyEducations));
        dispatch(addUsers(dummyPublicUsers));

    }, [dispatch]);

    // if ((!user && pathname !== "/chat") || (!user && pathname !== "/home")) {
    //     return <LoadingDots />
    // }

    return (
        <div className="flex min-h-screen flex-col">
            {!hideNavbar && <Navbar />}
            <div className={`flex flex-grow flex-col overflow-x-hidden ${!hideNavbar ? 'mt-[103px]' : ''}`}>
                {children}
            </div>
            {!hideNavbar && <FloatingIcon />}
        </div>
    );
}
