
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/AuthContextProvider";

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default RootLayout
