import { Loader } from '@/components/shared';
import PostCard from '@/components/PostCard';
import { useUserContext } from '@/context/AuthContextProvider'
import { useGetPosts } from '@/lib/react-query/queries';
import { TNewPost } from '@/types';

const Home = () => {
    const { user } = useUserContext()
    const {
        data: posts,
        isLoading: isPostLoading,
        isError: isErrorPosts,
    } = useGetPosts();
    return (
        <div className='flex flex-col w-full items-center justify-center mb-[5vh]'>
            <div className='h-[10vh] my-[2.5vh] flex flex-col justify-between'>
                <h1 className="h3-bold md:h2-bold text-center w-full">Bonjour <span className='text-primary-500'>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span></h1>
                {!isErrorPosts && <h2 className="h4-bold md:h3-bold text-center w-full">Voici les derniers posts</h2>}
            </div>
            {isErrorPosts &&
                <div className="flex flex-1">
                    <div className="home-container">
                        <p className="body-medium text-light-1">Une erreur est survenue lors de la récupération des posts</p>
                    </div>
                </div>
            }
            <div className="flex flex-1">
                <div className="home-posts-container">
                    <div className="home-posts">
                        {isPostLoading && !posts ? (
                            <Loader />
                        ) : Array.isArray(posts?.data) && posts?.data?.length > 0 ? (
                            <ul className="flex flex-col flex-1 gap-9 w-full ">
                                {posts?.data.map((post: TNewPost) => (
                                    <li key={post.idpost} className="flex justify-center w-full">
                                        <PostCard post={post} />
                                    </li>
                                ))}
                            </ul>
                        ) : <h2 className="h4-bold md:h3-bold text-center w-full">Il n'éxiste pas encore de post</h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
