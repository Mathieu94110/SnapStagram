import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContextProvider";
import { checkIsLiked } from "@/lib/utils";

const PostStats = ({ post, userId }) => {
    const location = useLocation();
    const likesList = post.likes.map((user) => user.$id);

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const { user: currentUser } = useUserContext()

    const savedPostRecord = currentUser?.save.find(
        (record) => record.post.id === post.id
    );

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [currentUser]);

    const handleLikePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
    };

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            //delete
        }

        // save post
        setIsSaved(true);
    };

    const containerStyles = location.pathname.startsWith("/profile")
        ? "w-full"
        : "";

    return (
        <div
            className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId)
                        ? "/public/assets/images/liked.svg"
                        : "/public/assets/images/like.svg"
                        }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isSaved ? "/public/assets/images/saved.svg" : "/public/assets/images/save.svg"}
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
