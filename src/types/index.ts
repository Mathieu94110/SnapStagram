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
    idpost?: number;
    caption: string;
    location: string;
    tags: string;
    image: Blob;
    author: string
    authorId: number,
};
export type INewPostData = {
    data: INewPost;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};
