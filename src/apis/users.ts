import { API_REGISTER_USERS, API_LOGIN_USERS } from "@/constants"
import { TNewUser } from "@/types";

export async function createUser(newUser: TNewUser) {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

export async function logUser(UserInfo: { email: string; password: string }) {
    try {
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
    } catch (error) {
        console.error(error);
    }
}


export async function getCurrentUser(userId: null | string) {
    try {
        const response = await fetch(`${API_LOGIN_USERS}?user_id=${Number(userId)}`, {
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
                throw new Error('Error api getCurrentUser');
            }
        }
    } catch (error) {
        console.error(error);
    }
}