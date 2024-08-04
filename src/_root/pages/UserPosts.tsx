import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/Loader';
import { useUserContext } from '@/context/AuthContextProvider';
import { useGetUserPosts } from '@/lib/react-query/queries';

const UserPosts = () => {
    const { user } = useUserContext();
    const { data: userPosts, isLoading: isPostLoading,
        isError: isErrorPosts } = useGetUserPosts(user.iduser!);

    return (
        <div className="user-posts-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <img
                    src="/assets/images/save.svg"
                    width={36}
                    height={36}
                    alt="edit"
                    className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold text-left w-full">Posts en ligne</h2>
            </div>
            {isErrorPosts &&
                <div className="flex flex-1">
                    <div className="home-container">
                        <p className="body-medium text-light-1">Une erreur est survenue lors de la récupération des posts</p>
                    </div>
                </div>
            }
            {isPostLoading && !userPosts ? (
                <Loader />
            ) : userPosts?.data?.length > 0 ? (
                <ul className="w-full flex justify-center max-w-5xl gap-9">
                    <GridPostList posts={userPosts.data} />
                </ul>
            ) : <h2 className="h4-bold md:h3-bold text-center w-full">Vous n'avez pas encore créer de post</h2>}
        </div>
    );
}

export default UserPosts
