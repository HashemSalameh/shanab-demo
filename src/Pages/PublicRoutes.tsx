import { Navigate, Outlet } from "react-router-dom";
import {  useAppSelector } from "../Redux/hook";
// this private route checks the token (authenticated)
// you eithier return the nested routes by using outlet or navigate to somewhere_else

const PublicRoutes = () => {
  const token = useAppSelector((state)=> state.authenticate.token);  
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;