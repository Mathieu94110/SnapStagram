import { Link } from "react-router-dom";
import { INewPost } from "@/types";

type GridPostListProps = {
    posts: INewPost[];
    showUser?: boolean;
};

const GridPostList = ({
    posts,
    showUser = true,
}: GridPostListProps) => {

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
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;
