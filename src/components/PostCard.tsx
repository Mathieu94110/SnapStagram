import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContextProvider";
import { TNewPost } from "@/types";
import { PostStats } from "@/components/shared";
import { useGetPostLikes } from "@/lib/react-query/queries";
import Loader from "./shared/Loader";
import { multiFormatDateString } from "@/lib/utils";


const PostCard = ({ post }: { post: TNewPost }) => {
    const { user } = useUserContext()
    const { data: postLikes, isLoading: isPostLikesLoading, isError: isErrorPostLikes } = useGetPostLikes(post.idpost!);

    if (!post.authorId) return;
    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.authorId}`}>
                        <img
                            src="/public/assets/images/profile-placeholder.svg"
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                            {post.author}
                        </p>
                        <p className="subtle-semibold lg:small-regular ">
                            {multiFormatDateString(post.created)}
                        </p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">
                                {post.caption}
                            </p>
                            •
                            <p className="subtle-semibold lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    to={`/update-post/${post.idpost}`}
                    className={`${user.iduser !== post.authorId && "hidden"}`}>
                    <img
                        src={"/public/assets/images/edit.svg"}
                        alt="edit"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            <Link to={`/posts/${post.idpost}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.split(',').map((tag: string, index: number) => (
                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img
                    src={`http://localhost:8888/api/${JSON.stringify(post.image).slice(4, -1)}` || "/public/assets/images/profile-placeholder.svg"}
                    alt="post image"
                    className="post-card_img"
                />
            </Link>
            {isPostLikesLoading && !postLikes ? (
                <Loader />
            ) : isErrorPostLikes ?
                (
                    <div className="flex flex-1">
                        <p className="body-medium text-light-1">Une erreur est survenue lors de la récupération des likes</p>
                    </div>
                ) : (
                    <PostStats post={post} userId={user.iduser!} likes={postLikes?.data ?? []} />
                )}
        </div>
    );
};

export default PostCard;