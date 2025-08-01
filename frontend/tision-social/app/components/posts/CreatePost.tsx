"use client";
import React, { useRef, useState } from 'react';
import Button from "@/app/components/buttons/Button"
import { Image, Video } from 'lucide-react';
import UserAvatar from "@/app/components/avatars/UserAvatar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/data/store/store';
import { setText, resetPost } from '@/app/data/post/postState/createPostSlice';
import { addPost } from '@/app/data/post/postState/postSlice';
import { Post } from "@/app/data/post/types";
import MediaPreviewModal from "@/app/components/posts/MediaPreviewModal";


const CreatePost: React.FC = () => {
    const dispatch = useDispatch();
    const { text } = useSelector((state: RootState) => state.createPostSlice);
    const [picture, setPicture] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

    const handleVideoClick = () => {
        videoInputRef.current?.click();
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setText(event.target.value));
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type.startsWith("image/")) {
                setPicture(selectedFile);
                setShowModal(true);
            } else {
                alert("Please select a valid image file.");
            }
            e.target.value = '';// manually set the file picker so that selecting the same file will trigger the onChange on the filepicker

            // You can add validation or preview logic here
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type.startsWith("video/")) {
                setVideo(selectedFile);
                setShowModal(true);
            } else {
                alert("Please select a valid video file.");
            }
            e.target.value = '';// manually set the file picker so that selecting the same file will trigger the onChange on the filepicker
        }
    };

    const handleCloseModal = () => {
        setPicture(null);
        setVideo(null);
        setShowModal(false);
    };

    const handlePost = () => {
        if (!text.trim() && !picture && !video) return;

        const pictureUrl = picture ? URL.createObjectURL(picture) : '';
        const videoUrl = video ? URL.createObjectURL(video) : '';

        // Determine post type based on what is present
        let type: Post['type'];

        if (text && picture && !video) {
            type = "text+picture";
        } else if (text && video && !picture) {
            type = "text+video";
        } else if (text && !picture && !video) {
            type = "text";
        } else if (picture && !text && !video) {
            type = "picture";
        } else if (video && !text && !picture) {
            type = "video";
        } else {
            // fallback, e.g., only text or empty post
            type = "text";
        }

        const currentPost: Post = {
            id: Date.now(),
            text: text || '',
            picture: pictureUrl,
            video: videoUrl,
            type,              // << Set the type here
            createdAt: new Date().toISOString(),
        };

        dispatch(addPost(currentPost));
        dispatch(resetPost());
        setPicture(null);
        setVideo(null);
        setShowModal(false);
    };

    return (
        <div className="w-full min-h-[80px] bg-primary px-1">
            <form
                className="w-full h-full"
                onSubmit={e => {
                    e.preventDefault();
                    handlePost();
                }}
            >
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <textarea
                        className="w-full h-[80px] p-4 text-lg bg-white text-black rounded-lg focus:outline-none border border-gray-700"
                        placeholder="What's on your mind?"
                        name="postContent"
                        rows={2}
                        value={text}
                        onChange={handleTextChange}
                        autoFocus
                    />
                </div>

                <div className="flex flex-row w-full justify-between items-center border rounded-full border-gray-200 py-1">
                    <div className="flex flex-row w-full">
                        <UserAvatar />
                    </div>

                    <div className="flex flex-row w-full justify-end gap-4 px-2 py-1 px-1 items-center">
                        {/* Hidden file inputs */}
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            style={{ display: 'none' }}
                            onChange={handleVideoChange}
                        />

                        {/* Image icon triggers hidden image input */}
                        <div style={{ width: 32, height: 32 }} onClick={handleImageClick}>
                            <Image className="w-6 h-6 text-blue-500 cursor-pointer" />
                        </div>

                        {/* Video icon triggers hidden video input */}
                        <div style={{ width: 36, height: 36 }} onClick={handleVideoClick}>
                            <Video className="w-7 h-7 text-red-500 cursor-pointer" />
                        </div>

                        <Button text="Post" color="secondary" size="small" className="rounded-full" onClick={handlePost} />
                    </div>
                </div>

                {showModal && (

                    <MediaPreviewModal picture={picture} video={video} onClose={handleCloseModal} onPost={handlePost} />

                )}

            </form>
        </div>
    );
};

export default CreatePost;




