// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useMemo, useEffect } from 'react';
// import { RootState } from '@/app/data/store/store';
// import Button from "@/app/components/buttons/Button";

// const ImagePreviewModal = () => {
//     const { picture } = useSelector((state: RootState) => state.createPostSlice)

//     const imagePreview = useMemo(() => {
//         if (picture) {
//             return URL.createObjectURL(picture)
//         }
//         return undefined
//     }, [picture])

//     useEffect(() => {
//         return () => {
//             if (imagePreview) {
//                 URL.revokeObjectURL(imagePreview)
//             }
//         }
//     }, [imagePreview])

//     return (

//         <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] px-2 py-2">
//             {picture && (

//                 <div className="flex flex-col gap-2">
//                     <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-full max-h-[300px] object-contain rounded-md"

//                     />

//                     <Button text="Post" color="secondary" size="small" className="rounded-full" />
//                 </div>

//             )}
//         </div>


//     )
// }

// export default ImagePreviewModal