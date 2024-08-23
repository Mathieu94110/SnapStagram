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

export type TPostReturn = {
    status: number;
    message: string
}

export type TNewPostDataArray = {
    data?: TNewPost[],
} & TPostReturn

export type TNewPostData = {
    data?: TNewPost,
} & TPostReturn

export type TNavLink = {
    imgURL: string;
    route: string;
    label: string;
};

export type TPostLikes = {
    idlike: number,
    iduser: number,
    idpost: number,
    datelike: Date
}