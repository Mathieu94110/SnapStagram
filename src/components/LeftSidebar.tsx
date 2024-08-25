import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TNavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import Loader from "./shared/Loader";
import { Button } from "./ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContextProvider";

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

    const handleSignOut = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        localStorage.removeItem("availability");
        navigate("/connexion");
    };

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col">
                <Link to="/" className="flex gap-2 items-center">
                    <img
                        src="/public/assets/images/logo.png"
                        alt="logo"
                        width={150}
                        height={30}
                    />
                </Link>

                {isLoading || !user.email ? (
                    <div className="h-14">
                        <Loader />
                    </div>
                ) : (
                    <div className="mb-8 mt-2">
                        <Link to={`/profile/${user.iduser}`} className="flex gap-3 items-center">
                            <img
                                src={"/public/assets/images/profile-placeholder.svg"}
                                alt="profile"
                                className="h-14 w-14 rounded-full"
                            />
                            <div className="flex flex-col">
                                <p className="body-bold">{user.name}</p>
                                <p className="small-regular text-light-3">@{user.userName}</p>
                            </div>
                        </Link>
                    </div>
                )}
                <div className="flex flex-col gap-3">
                    <ul className="flex flex-col gap-3">
                        {sidebarLinks.map((link: TNavLink) => {
                            const isActive = pathname === link.route;

                            return (
                                <li
                                    key={link.label}
                                    className={`leftsidebar-link group ${isActive && "bg-primary-500"
                                        }`}>
                                    <NavLink
                                        to={link.route}
                                        className="flex gap-4 items-center p-4">
                                        <img
                                            src={link.imgURL}
                                            alt={link.label}
                                            className={`group-hover:invert-white ${isActive && "invert-white"
                                                }`}
                                        />
                                        {link.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <Button
                        variant="destructive"
                        onClick={(e) => handleSignOut(e)}>
                        <img src="/public/assets/images/logout.svg" alt="logout" />
                        <p className="small-medium lg:base-medium">Déconnexion</p>
                    </Button>
                </div>
            </div>


        </nav>
    );
};

export default LeftSidebar;