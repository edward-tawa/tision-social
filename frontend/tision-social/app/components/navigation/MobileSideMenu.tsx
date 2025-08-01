"use client";
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface Props {
    visible: boolean;
    onClose: () => void;
}

const MobileSideMenu = ({ visible, onClose }: Props) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-2/3 h-screen bg-secondary z-50 flex flex-col px-4 pt-6 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-white text-xl font-bold">Tision Social</div>
                        <button onClick={onClose}>
                            <X className="w-7 h-7 text-white" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-10 mt-8 w-full items-center text-lg">
                        <div className="text-white tracking-widest">Home</div>
                        <div className="text-white tracking-widest">Profile</div>
                        <div className="text-white tracking-widest">Settings</div>
                        <div className="text-white tracking-widest">Logout</div>
                    </nav>

                    <div className="absolute bottom-5 flex flex-col left-0 w-full p-4 h-[150px] pb-10">
                        <p className="text-sm text-center text-white">
                            Tision Social — Connecting Visionaries, Creators, and Communities.
                            © {new Date().getFullYear()} Tision Social. All rights reserved.
                            Building a future where every voice matters.
                        </p>
                        <div className="flex flex-row justify-center items-center gap-4 mt-2">
                            <FaFacebookF className="w-5 h-5" />
                            <FaTwitter className="w-5 h-5" />
                            <FaInstagram className="w-5 h-5" />
                            <FcGoogle className="w-5 h-5" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileSideMenu;
