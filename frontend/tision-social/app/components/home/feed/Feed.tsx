import React from 'react'
import CreatePost from '../../posts/CreatePost'
import PostFeed from "@/app/components/posts/PostFeed"

const Feed = () => {
    return (
        <div className="flex flex-col gap-1">
            <CreatePost />
            <PostFeed />

        </div>
    )
}

export default Feed