import Loader from '@/components/Loader';
import PostCard from '@/components/PostCard';
import { useUserContext } from '@/context/AuthContextProvider'
import { useGetUserPosts } from '@/lib/react-query/queries';

const Home = () => {
    const { user } = useUserContext()
    const {
        data: posts,
        isLoading: isPostLoading,
        isError: isErrorPosts,
    } = useGetUserPosts();
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <h1>Bonjour {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>

            {isErrorPosts ?
                <div className="flex flex-1">
                    <div className="home-container">
                        <p className="body-medium text-light-1">Une erreur est survenue lors de la récupération des posts</p>
                    </div>
                </div>
                : null
            }
            <div className="flex flex-1">
                <div className="home-container">
                    <div className="home-posts">
                        <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                        {isPostLoading && !posts ? (
                            <Loader />
                        ) : (
                            <ul className="flex flex-col flex-1 gap-9 w-full ">
                                {posts?.documents.map((post) => (
                                    <li key={post.$id} className="flex justify-center w-full">
                                        <PostCard post={post} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
