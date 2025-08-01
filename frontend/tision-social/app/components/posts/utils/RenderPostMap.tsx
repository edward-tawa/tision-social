import React from 'react'
import { Post } from "@/app/data/post/types";


interface PostProps {
  post: Post;
}
const RenderPostMap: React.FC<PostProps> = ({ post }) => {

  const renderPostContent = (post: Post) => {
    switch (post.type) {
      case "text":
        return (
          <div className="flex justify-center items-center w-full min-h-[300px] sm:min-h-[350px] md:min-h-[430px]">
            <div className="w-fit text-center px-4b tracking-wider">
              {post.text && <p className="text-black text-4xl tracking-wider">{post.text}</p>}
            </div>
          </div>
        )

      case "picture":
        return (
          <div className="w-[95%] min-h-[300px] sm:min-h-[350px] md:min-h-[430px] m-auto relative overflow-hidden rounded-lg">
            <img
              src={post.picture}
              alt="post"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </div>
        )


      case "text+picture":
        return (
          <>
            <p className="text-white">{post.text}</p>
            <div className="w-[95%] min-h-[300px] sm:min-h-[350px] md:min-h-[430px] m-auto relative overflow-hidden rounded-lg">
              <img
                src={post.picture}
                alt="post"
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>
          </>
        );

      case "video":
        return (
          <div className="w-[95%] min-h-[300px] sm:min-h-[350px] md:min-h-[430px] m-auto relative overflow-hidden rounded-lg">
            <video controls className="w-full h-full object-cover absolute top-0 left-0">
              <source src={post.video} type="video/mp4" />
            </video>
          </div>
        );

      case "text+video":
        return (
          <>
            <p className="text-white">{post.text}</p>
            <video controls className="w-full ">
              <source src={post.video} type="video/mp4" />
            </video>
          </>
        );

      default:
        return null;
    }
  }
  return (
    <div>
      {
        renderPostContent(post)
      }
    </div>
  )
}

export default RenderPostMap
