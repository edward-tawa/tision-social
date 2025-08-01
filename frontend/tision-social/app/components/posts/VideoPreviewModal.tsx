import React from 'react'
import { useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import { RootState } from '@/app/data/store/store';
import Button from "@/app/components/buttons/Button";

const VideoPreviewModal = () => {
    const { video } = useSelector((state: RootState) => state.createPostSlice)

    const videoPreview = useMemo(() => {
        if (video) {
            return URL.createObjectURL(video)
        }
        return undefined
    }, [video])
    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview)
            }
        }
    }, [videoPreview])
    return (

        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] px-2 py-2">
            {video && (
                <div className="flex flex-col gap-2">
                    <video
                        controls
                        className="w-full max-h-[300px] rounded-lg"
                    >
                        <source src={videoPreview} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <Button text="Post" color="secondary" size="small" className="rounded-full" />
                </div>

            )}
        </div>


    )
}

export default VideoPreviewModal