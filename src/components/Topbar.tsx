import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContextProvider";

const Topbar = () => {
    const { user, setUser, setIsAuthenticated } = useUserContext();
    const navigate = useNavigate();


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
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/public/assets/images/logo.png"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost"
                        onClick={(e) => handleSignOut(e)}>
                        <img src="/public/assets/images/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img
                            src="/public/assets/images/profile-placeholder.svg"
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Topbar;