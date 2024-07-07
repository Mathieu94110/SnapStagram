import { API_CREATE_POST } from "../constants"

export async function createPost(newPost: { caption: string; file: string; location: string; tags: string, author: number } | null) {
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