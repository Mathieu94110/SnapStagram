export type TUser = {
    iduser: number;
    name: string;
    username: string;
    email: string;
    save: { post: { id: string } }[];
};

export type TNewUser = {
    iduser?: number;
    name: string;
    userName: string;
    email: string;
    password: string;
    generic: { generic: { message: string; }; } | null
};

export type TNewPost = {
    idpost?: number;
    caption: string;
    location: string;
    tags: string;
    image: Blob;
    author: string
    authorId: number,
    likes: number[]
};
export type TNewPostData = {
    data: TNewPost;
}

export type TNavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type TPostReturn = {
    status: number;
    message: string
}