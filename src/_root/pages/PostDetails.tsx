import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { PostStats, Loader } from "@/components/shared"
import { useGetPostById, useDeletePost, useGetPostLikes } from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContextProvider";

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUserContext();

    const { data: post, isLoading } = useGetPostById(id as string);
    const { data: postLikes, isLoading: isPostLikesLoading, isError: isErrorPostLikes } = useGetPostLikes(Number(id));
    const { mutate: deletePost } = useDeletePost();

    const handleDeletePost = () => {
        deletePost({ postId: post.data.idpost });
        navigate(-1);
    };

    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="shad-button_ghost">
                    <img
                        src={"/public/assets/images/back.svg"}
                        alt="back"
                        width={24}
                        height={24}
                    />
                    <p className="small-medium lg:base-medium">Retour</p>
                </Button>
            </div>

            {isLoading || !post ? (
                <Loader />
            ) : (
                <div className="post_details-card">
                    <img
                        src={post.data.image ? `http://localhost:8888/api/${JSON.stringify(post?.data.image).slice(4, -1)}` : '/public/assets/images/gallery-add.svg'}
                        alt="creator"
                        className="post_details-img"
                    />

                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <Link
                                to="/"
                                className="flex items-center gap-3">
                                <img
                                    src="/public/assets/images/profile-placeholder.svg"
                                    alt="creator"
                                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                                />
                                <div className="flex gap-1 flex-col">
                                    <p className="base-medium lg:body-bold text-light-1">
                                        {post.data.author}
                                    </p>
                                    <div className="flex-center gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular ">
                                            {multiFormatDateString(post.data.created)}
                                        </p>
                                        •
                                        <p className="subtle-semibold lg:small-regular">
                                            {post.data.location}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex-center gap-4">
                                <Link
                                    to={`/update-post/${post.data.idpost}`}
                                    className={`${user.iduser !== post.data.authorId && "hidden"}`}>
                                    <img
                                        src={"/public/assets/images/edit.svg"}
                                        alt="edit"
                                        width={24}
                                        height={24}
                                    />
                                </Link>

                                <Button
                                    onClick={handleDeletePost}
                                    variant="ghost"
                                    className={`ost_details-delete_btn ${user.iduser !== post.data.authorId && "hidden"
                                        }`}>
                                    <img
                                        src={"/public/assets/images/delete.svg"}
                                        alt="delete"
                                        width={24}
                                        height={24}
                                    />
                                </Button>
                            </div>
                        </div>

                        <hr className="border w-full border-dark-4/80" />

                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            <p>{post.data.caption}</p>
                            <ul className="flex gap-1 mt-2">
                                {post.data.tags.split(',').map((tag: string, index: string) => (
                                    <li
                                        key={`${tag}${index}`}
                                        className="text-light-3 small-regular">
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                </div>
            )}
        </div>
    );
};

export default PostDetails;
