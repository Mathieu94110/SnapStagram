import PostForm from "@/components/PostForm";

const CreatePost = () => {
    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                    <img
                        src="public/assets/images/add-post.svg"
                        width={36}
                        height={36}
                        alt="add"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Creér un post</h2>
                </div>

                <PostForm action="Créer" />
            </div>
        </div>
    );
};

export default CreatePost;