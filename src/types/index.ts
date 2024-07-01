export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    save: { post: { id: string } }[];
};
export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
};
