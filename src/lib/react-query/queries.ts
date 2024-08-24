import { createPost, updatePost, getPosts, getPostById, getUserPosts, deletePost, likeDislikePost, getUserPostLikes, searchPosts } from '@/apis/posts'
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { TNewPost, TNewUser, TPostReturn } from '@/types';
import { createUser, logUser, getCurrentUser } from '@/apis/users'


// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: TNewUser) => createUser(user),
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            logUser(user),
    });
};

export const useGetCurrentUserById = (userId: string) => {
    return useQuery({
        queryKey: ['getCurrentUserById', userId],
        queryFn: () => getCurrentUser(userId),
        enabled: Boolean(userId),
    });
};

// ============================================================
// POST QUERIES
// ============================================================

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: FormData) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts'],
            });
        },
    });
};

export function useGetPosts() {
    return useQuery({
        queryKey: ['getPosts'],
        queryFn: getPosts,
    });
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: ['getPostById', postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: FormData) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["getPostById", data.idpost],
            });
        },
    });
};

export const useGetUserPosts = (userId: number) => {
    return useQuery({
        queryKey: ['getUserPosts', userId],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId,
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId }: { postId?: number }) =>
            deletePost(postId!),
        onSuccess: () => {
            (response: TPostReturn) => response
            queryClient.invalidateQueries({
                queryKey: ['getUserPosts'],
            });
        },
    });
};

export const useGetPostLikes = (postId: number) => {
    return useQuery({
        queryKey: ['getUserPostLikes', postId],
        queryFn: () => getUserPostLikes(postId),
        enabled: !!postId,
    });
};


export const useLikeDislikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (likeInfo: FormData) => likeDislikePost(likeInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getUserPostLikes"],
            });
        },
    });
};

export const useSearchPosts = (searchTerm: string) => {
    return useQuery({
        queryKey: ['getSearchPosts', searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm,
    });
};