import React from 'react';
import { Post } from "@/app/data/post/postState/postSlice";


interface PostProps {
  post: Post;
}

const Activity: React.FC<PostProps> = ({ post }) => {
  if (!post) return null;
  function renderPost(post: Post) {
    switch (post.type) {
      case "text":
        return (
          <div className="flex justify-center items-center w-full min-h-[300px] sm:min-h-[350px] md:min-h-[430px]">
            <div className="w-fit text-center px-4b tracking-wider">
              <p className="text-black text-4xl tracking-wider">{post.text}</p>
            </div>
          </div>
        )

      case "picture":
        return (
          <div className="w-[95%] min-h-[300px] sm:min-h-[350px] md:min-h-[430px] m-auto relative overflow-hidden rounded-lg">
            <img
              src={post.picture}
              alt="pic post"
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
    <div className="bg-white rounded-lg p-4 w-full min-h-[300px] sm:min-h-[350px] md:min-h-[430px]">
      {
        renderPost(post)
      }
    </div>
  )
}

export default Activity