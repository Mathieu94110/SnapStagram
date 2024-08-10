import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { INewPost } from "@/types";
import { Button } from "../ui";
import { useUserContext } from "@/context/AuthContextProvider";
import { useDeletePost } from "@/lib/react-query/queries";

type GridPostListProps = {
    posts: INewPost[];
    showUser?: boolean;
};

const GridPostList = ({
    posts,
    showUser = true,
}: GridPostListProps) => {
    const { data: deleteResponse, mutate: deletePost, isSuccess, isError } = useDeletePost();
    const { user } = useUserContext();

    const handleDeletePost = async (id: number) => {
        await deletePost({ postId: id })
        if (isSuccess) {
            toast.success('Post créer avec succès !');
        } else if (isError) {
            toast.error('Erreur survenue lors de la suppression du post !');
        }
    };

    return (
        <ul className="grid-container">
            {posts.map((post) => (
                <li key={post.idpost} className="relative min-w-80 h-80">
                    <Link to={`/update-post/${post.idpost}`} className="grid-post_link">
                        <img
                            src={`http://localhost:8888/api/${JSON.stringify(post.image).slice(4, -1)}`}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex items-center justify-start gap-2 flex-1">
                                <img
                                    src="/public/assets/images/profile-placeholder.svg"
                                    alt="auteur"
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className="line-clamp-1">{post.author}</p>
                            </div>
                        )}
                        <Button
                            onClick={() => handleDeletePost(post.idpost!)}
                            variant="ghost"
                            className={`ost_details-delete_btn ${user.iduser !== post?.authorId && "hidden"
                                }`}>
                            <img
                                src={"/public/assets/images/delete.svg"}
                                alt="delete"
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;
