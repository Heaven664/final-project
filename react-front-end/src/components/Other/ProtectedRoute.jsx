import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({user, children}) {

  if (!user) {
    return <Navigate to={'/login'} replace={true} />
  }
  
  return children? children: <Outlet />;

}