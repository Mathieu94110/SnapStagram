import { API_CREATE_POST, API_GET_POSTS } from "@/constants"

export async function createPost(newPost: { caption: string; file?: File; location: string; tags: string, author: number } | null) {
    const response = await fetch(API_CREATE_POST, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
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
        const response = await fetch(API_GET_POSTS, {
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
