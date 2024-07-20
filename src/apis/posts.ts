import { API_CREATE_POST, API_GET_POSTS } from "@/constants"

// export async function createPost(newPost: { caption: string; file?: File; location: string; tags: string, author: number } | null) {
export async function createPost(newPost: FormData) {
    if (newPost) for (const value of newPost.values()) {
        console.log(value);
    }
    // const plainFormData = Object.fromEntries(newPost);
    // const formDataJsonString = JSON.stringify(plainFormData);
    const response = await fetch(API_CREATE_POST, {
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

// async function postFormDataAsJson({ url, formData }) {
// 	const plainFormData = Object.fromEntries(formData.entries());
// 	const formDataJsonString = JSON.stringify(plainFormData);

// 	const fetchOptions = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json",
// 		},
// 		body: formDataJsonString,
// 	};

// 	const response = await fetch(url, fetchOptions);

// 	if (!response.ok) {
// 		const errorMessage = await response.text();
// 		throw new Error(errorMessage);
// 	}

// 	return response.json();
// }



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
