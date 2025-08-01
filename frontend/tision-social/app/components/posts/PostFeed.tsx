//PostFeed
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from "@/app/components/posts/Post";
import { targetIdToReactionsMap } from "@/app/data/post/comment/reaction/selctors";
import { allPosts, loading, error, nextCursor } from "@/app/data/post/postState/postSelectors";
import { getPostsThunk } from "@/app/data/post/thunk";
import { postIdToCommentsMap } from "@/app/data/post/comment/selectors";
import { AppDispatch } from '@/app/data/store/store';
import { currentUserSelector } from "@/app/data/user/selectors";
import debounce from 'lodash/debounce';


//post, comments, userId
const PostFeed = () => {
    const currentuser = useSelector(currentUserSelector);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector(allPosts);
    const nexttCursor = useSelector(nextCursor);
    const loadingg = useSelector(loading);
    const postIdMap = useSelector(postIdToCommentsMap);
    const targetIdToReactionMap = useSelector(targetIdToReactionsMap);
    const [userId, setUserId] = useState<number | null>(null);

    // Load user ID on mount
    useEffect(() => {
        (() => {
            const id = currentuser.id || 1;
            setUserId(id);
        })();
    }, []);

    useEffect(() => {
        const loadMorePosts = debounce(() => {
            if (!loadingg && nexttCursor && userId !== null) {
                dispatch(getPostsThunk({ userId: userId, cursor: nexttCursor, limit: 20 }));
            }
        }, 500); // waits 500ms after last trigger before running

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                loadMorePosts(); // debounced version
            }
        }, {
            root: null,
            rootMargin: '0px 0px 150px 0px',
            threshold: 0,
        });

        const current = bottomRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
            loadMorePosts.cancel(); // cleanup debounce
        };
    }, [userId, loadingg, nexttCursor, dispatch]);


    return (
        <div className="flex flex-col gap-2" >
            {posts.map(post => {
                return (
                    <div key={post.id} >
                        <Post post={post} comments={postIdMap[post.id] || []} userId={1}
                            likeCount={(targetIdToReactionMap[post.id] || []).filter(reaction => reaction.type === "like" && reaction.content.status).length}
                            dislikeCount={(targetIdToReactionMap[post.id] || []).filter(reaction => reaction.type === "dislike" && reaction.content.status).length}
                            emojiCount={(targetIdToReactionMap[post.id] || []).filter(reaction => reaction.type === "emoji" && reaction.content.value).length}

                        />
                    </div>
                )
            })}

            {/* 👇 This is the sentinel to watch for loading more posts */}
            <div ref={bottomRef} style={{ height: "1px" }}></div>
        </div>
    )
}

export default PostFeed