import { API_POSTS } from "@/constants"

export async function createPost(newPost: FormData) {
    const response = await fetch(API_POSTS, {
        method: 'POST',
        body: newPost,
    });
    const body = await response.json();

    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createPost');
        }
    }
}

export async function getPosts() {
    try {
        const response = await fetch(API_POSTS, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        });
        const data = response.json();
        if (!data) throw Error;
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(postId?: string) {
    try {
        const response = await fetch(`${API_POSTS}?post_id=${postId}`, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        });
        const data = response.json();
        if (!data) throw Error;
        return data;
    } catch (error) {
        console.log(error);
    }
}