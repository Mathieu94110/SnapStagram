import { useParams } from "react-router-dom";
import { Loader } from "@/components/shared";
import PostForm from "@/components/PostForm";
import { useGetPostById } from "@/lib/react-query/queries";

const EditPost = () => {
    const { id } = useParams();
    const { data: post, isLoading } = useGetPostById(id as string);

    if (isLoading)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <div className="flex flex-1">
            <div className="common-container">
                <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                    <img
                        src="/public/assets/images/edit.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Editer le Post</h2>
                </div>

                {isLoading ? <Loader /> : <PostForm action="Mettre à jour" post={post} />}
            </div>
        </div>
    );
};

export default EditPost;