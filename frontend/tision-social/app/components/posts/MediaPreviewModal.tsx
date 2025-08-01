import React, { useEffect, useState } from 'react';
import Button from '@/app/components/buttons/Button';

interface MediaPreviewModalProps {
    picture: File | null;
    video: File | null;
    onClose: () => void;
    onPost: () => void;
};

const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({ picture, video, onClose, onPost }) => {
    const [mediaPreview, setMediaPreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        let previewUrl: string | undefined;

        if (picture) {
            previewUrl = URL.createObjectURL(picture);
            setMediaPreview(previewUrl);
        } else if (video) {
            previewUrl = URL.createObjectURL(video);
            setMediaPreview(previewUrl);
        } else {
            setMediaPreview(undefined);
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [picture, video]);

    const isImage = !!picture;
    const isVideo = !!video;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[360px] sm:w-[500px]  sm:h-[400px] px-2 py-2 bg-white rounded shadow-lg z-50"
        >
            {(isImage || isVideo) && mediaPreview && (
                <div className="flex flex-col gap-1 h-full w-full">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black text-4xl font-bold cursor-pointer">
                            &times;
                        </button>
                    </div>

                    {isImage && (
                        <img
                            src={mediaPreview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-md"
                        />
                    )}

                    {isVideo && (
                        <video controls className="w-full max-h-[300px] rounded-lg">
                            <source src={mediaPreview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    <Button text="Post" color="secondary" size="small" className="rounded-full" onClick={onPost} />
                </div>
            )}
        </div>
    );
};

export default MediaPreviewModal;
