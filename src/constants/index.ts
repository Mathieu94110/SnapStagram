const BASE_USER_API_URI = "http://localhost:8888/api/user"
const BASE_POST_API_URI = "http://localhost:8888/api/posts"
export const API_REGISTER_USERS = `${BASE_USER_API_URI}/register.php`
export const API_LOGIN_USERS = `${BASE_USER_API_URI}/login.php`
export const API_POSTS = `${BASE_POST_API_URI}/posts.php`
export const API_POSTS_LIKES = `${BASE_POST_API_URI}/post-likes.php`

export const sidebarLinks = [
    {
        imgURL: "/public/assets/images/home.svg",
        route: "/home",
        label: "Accueil",
    },
    {
        imgURL: "/public/assets/images/wallpaper.svg",
        route: "/search-posts",
        label: "Rechercher",
    },
    {
        imgURL: "/public/assets/images/people.svg",
        route: "/all-users",
        label: "Profils",
    },
    {
        imgURL: "/public/assets/images/bookmark.svg",
        route: "/user-posts",
        label: "Enregistrés",
    },
    {
        imgURL: "/public/assets/images/gallery-add.svg",
        route: "/create-post",
        label: "Créér un post",
    },
];