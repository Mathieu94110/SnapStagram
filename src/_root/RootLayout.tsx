
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/context/AuthContextProvider";
import LeftSidebar from "@/components/LeftSidebar";
import Topbar from "@/components/Topbar";

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" />
  }
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
