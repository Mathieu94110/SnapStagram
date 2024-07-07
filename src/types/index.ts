export type IUser = {
    iduser: number;
    name: string;
    username: string;
    email: string;
    save: { post: { id: string } }[];
};

export type INewUser = {
    iduser?: number;
    name: string;
    userName: string;
    email: string;
    password: string;
    generic: { generic: { message: string; }; } | null
};

export type INewPost = {
    caption: string;
    file: string;
    location: string;
    tags: string;
    author: number
};

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};
