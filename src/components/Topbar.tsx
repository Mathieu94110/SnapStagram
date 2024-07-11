
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserContext } from "@/context/AuthContextProvider";

const Topbar = () => {
    const { user } = useUserContext();

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
                        onClick={() => { }}>
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