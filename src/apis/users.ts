const BASE_USER_API_URI = "http://localhost:8888/api/user";
const API_REGISTER_USERS = `${BASE_USER_API_URI}/register.php`;
const API_LOGIN_USERS = `${BASE_USER_API_URI}/login.php`;

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

export async function logUser(UserInfo: { email: string; password: string; generic: { generic: { message: string; } } | null }) {
    const response = await fetch(API_LOGIN_USERS, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserInfo),
    });
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        if (body) {
            throw body;
        } else {
            throw new Error('Error api logUser');
        }
    }
}