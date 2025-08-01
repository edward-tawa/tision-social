"use client";
import React, { useState } from "react";
import { Post } from "@/app/data/post/postState/postSlice";
import Activity from "@/app/components/activity/Activity";
import { motion, AnimatePresence } from "framer-motion";

interface PostProps {
    posts: Post[];
}

const ActivityList: React.FC<PostProps> = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const itemsPerPage = 2;

    const goLeft = () => {
        setDirection("left");
        setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
    };

    const goRight = () => {
        setDirection("right");
        setCurrentIndex((prev) => Math.min(prev + itemsPerPage, posts.length - itemsPerPage));
    };

    const visiblePostsArray = posts.slice(currentIndex, currentIndex + itemsPerPage);

    const variants = {
        initial: (dir: string) => ({
            x: dir === "right" ? 50 : -50,
            opacity: 0,
            scale: 0.98,
        }),
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        exit: (dir: string) => ({
            x: dir === "right" ? -50 : 50,
            opacity: 0,
            scale: 0.98,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        }),
    };

    if (posts.length <= 0) return null;

    return (
        <div className="shadow-lg rounded-lg p-4 relative">
            <div className="flex flex-row gap-1 items-center justify-between mb-2">
                <button
                    onClick={goLeft}
                    className="bg-secondary p-2 rounded-lg text-black cursor-pointer"
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <button
                    onClick={goRight}
                    className="bg-secondary p-2 rounded-lg text-black cursor-pointer"
                    disabled={currentIndex >= posts.length - 1}
                >
                    Next
                </button>
            </div>

            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    {visiblePostsArray.map((post) => (
                        <Activity key={post.id} post={post} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ActivityList;
