import { createPost, updatePost, getPosts, getPostById, getUserPosts, deletePost } from '@/apis/posts'
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { INewUser } from '@/types';
import { createUser, logUser, getCurrentUser } from '@/apis/users'


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

export const useGetCurrentUserById = (userId: any) => {
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

export const useGetPostById = (postId?: string) => {
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
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts'],
            });
            console.log(res);
        },
    });
};