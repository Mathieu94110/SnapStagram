const API_REGISTER_USERS = "http://localhost:8888/api/user/save";

export async function createUser(newUser: { name: string; userName: string; email: string; password: string; generic: { generic: { message: string; }; } | null; }) {
    const response = await fetch(API_REGISTER_USERS, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    const body = await response.json();
    console.log(body);
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api createUser');
        }
    }
}