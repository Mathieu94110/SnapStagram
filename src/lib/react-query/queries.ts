import { createPost } from '../../apis/posts'
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { INewUser, INewPost } from '../../types';
import { createUser } from '../../apis/users'


// ============================================================
// AUTH QUERIES
// ============================================================

// export const useCreateUserAccount = () => {
//     return useMutation({
//         mutationFn: (user: INewUser) => createUser(user),
//     });
// };
// ============================================================
// POST QUERIES
// ============================================================

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts'],
            });
        },
    });
};


