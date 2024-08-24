import { useLocation } from "react-router-dom";
import { useLikeDislikePost } from "@/lib/react-query/queries";
import { TNewPost, TPostLikes } from "@/types";
import { checkIsLiked } from "@/lib/utils";

const PostStats = ({ post, userId, likes }: { post: TNewPost, userId: number, likes: TPostLikes[] }) => {
    const location = useLocation();
    const { mutate: likeDislikePost } = useLikeDislikePost();

    const handleLikePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();
        const formData = new FormData();
        formData.append('postId', JSON.stringify(post.idpost));
        formData.append('userId', JSON.stringify(userId));
        const isUserLikedPost = checkIsLiked(likes, userId)
        if (isUserLikedPost) {
            // user already likes post
            formData.append('type', 'dislike');
            likeDislikePost(formData)
        }
        else {
            formData.append('type', 'like');
            likeDislikePost(formData);
        }
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
        </div>
    );
};

export default PostStats;
