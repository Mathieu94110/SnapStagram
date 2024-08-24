import { useState } from 'react'
import Loader from '@/components/Loader';
import { Input } from '@/components/ui';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queries';
import GridPostList from '@/components/shared/GridPostList';


const SearchPosts = () => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 1000);
    const {
        data: posts,
        isLoading: isPostLoading,
    } = useGetPosts();
    // const { data: searchedPosts, isLoading, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);
    // const shouldShowSearchResults = searchValue !== "";

    if (!posts && isPostLoading)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Rechercher des posts</h2>
                <div className="flex gap-1 px-4 py-2 w-full rounded-lg bg-dark-4">
                    <img
                        src="/public/assets/images/search.svg"
                        width={24}
                        height={24}
                        alt="search"
                    />
                    <Input
                        type="text"
                        placeholder="Rechercher"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearchValue(value);
                        }}
                    />
                </div>
            </div>
            {posts && !isPostLoading ? posts.data.length > 0 ? (
                <>
                    <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                        <h3 className="body-bold md:h3-bold">Posts populaires</h3>

                        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                            <p className="small-medium md:base-medium text-light-2">Tous</p>
                            <img
                                src="/public/assets/images/filter.svg"
                                width={20}
                                height={20}
                                alt="filter"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                        <GridPostList posts={posts.data} />
                    </div>
                </>
            ) : (
                <div className="home-container">
                    <p className="body-medium text-light-1">Il n'a a pas encore de post</p>
                </div>

            ) : (
                <div className="home-container">
                    <p className="body-medium text-light-1">Une erreur est survenue lors de la récupération des posts</p>
                </div>
            )}

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
            </div>
        </div>
    )

}

export default SearchPosts
