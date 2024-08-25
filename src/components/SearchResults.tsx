import { SearchResultProps } from "@/types";
import { Loader, GridPostList } from "@/components/shared";

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
    if (isSearchFetching) {
        return <Loader />;
    } else if (searchedPosts.length > 0) {
        return <GridPostList posts={searchedPosts} />;
    } else {
        return (
            <p className="text-light-4 mt-10 text-center w-full">Aucun résultat trouvé !</p>
        );
    }
};

export default SearchResults;
