import { createPost, getPosts } from '@/apis/posts'
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { INewUser, INewPost } from '@/types';
import { createUser, logUser } from '@/apis/users'


// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user),
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            logUser(user),
    });
};

// export const useSignOutAccount = () => {
//     return useMutation({
//         mutationFn: signOutAccount,
//     });
// };
// ============================================================
// POST QUERIES
// ============================================================

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: any) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts'],
            });
        },
    });
};

export function useGetUserPosts() {
    return useQuery({
        queryKey: ['getPosts'],
        queryFn: getPosts,
    });
}