import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TNewPost } from "@/types";
import { useLikePost } from "@/lib/react-query/queries";

type PostStatsProps = {
    post: TNewPost;
    userId: number;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();

    const { mutate: likePost } = useLikePost();

    const
        handleLikePost = (
            e: React.MouseEvent<HTMLImageElement, MouseEvent>
        ) => {
            e.stopPropagation();

            let likesArray = [];
            likesArray.push(userId);
            likePost({ postId: post.idpost, likesArray });
        };

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {

    };

    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";

    return (
        <div
            className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={"/public/assets/images/liked.svg"
                    }
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">3</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={"/public/assets/images/saved.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};

export default PostStats;
