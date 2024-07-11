const BASE_USER_API_URI = "http://localhost:8888/api/user"
const BASE_POST_API_URI = "http://localhost:8888/api/post"
export const API_REGISTER_USERS = `${BASE_USER_API_URI}/register.php`
export const API_LOGIN_USERS = `${BASE_USER_API_URI}/login.php`
export const API_CREATE_POST = `${BASE_POST_API_URI}/create-post.php`
export const API_GET_POSTS = `${BASE_POST_API_URI}/get-posts.php`

export const sidebarLinks = [
    {
        imgURL: "/public/assets/images/home.svg",
        route: "/",
        label: "Accueil",
    },
    {
        imgURL: "/public/assets/images/wallpaper.svg",
        route: "/explore",
        label: "Rechercher",
    },
    {
        imgURL: "/public/assets/images/people.svg",
        route: "/all-users",
        label: "Profils",
    },
    {
        imgURL: "/public/assets/images/bookmark.svg",
        route: "/saved",
        label: "Enregistrés",
    },
    {
        imgURL: "/public/assets/images/gallery-add.svg",
        route: "/create-post",
        label: "Créér un post",
    },
];