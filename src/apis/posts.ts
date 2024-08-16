import { API_POSTS } from "@/constants"

export async function createPost(newPost: FormData) {
    try {
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
    } catch (error) {
        console.error(error);
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
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error('Error api getPosts');
            }
        }
    } catch (err) {
        console.error(err);
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
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error('Error api getPostById');
            }
        }
    } catch (error) {
        console.error(error);
    }
}


export async function updatePost(newPost: FormData) {
    try {
        const response = await fetch(`${API_POSTS}?post_id=${newPost.get("idpost")}`, {
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
                throw new Error('Error api updatePost');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getUserPosts(userId: number) {
    try {
        const response = await fetch(`${API_POSTS}?author_id=${userId}`, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error('Error api getUserPosts');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deletePost(postId: number) {
    try {
        const response = await fetch(`${API_POSTS}?post_id=${postId}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error('Error api deletePost');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function likePost(postId: number, likesArray: number[]) {
    try {
        const response = await fetch(`${API_POSTS}?post_id=${postId}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likesArray),
        });
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error('Error api likePost');
            }
        }
    } catch (error) {
        console.error(error);
    }
}