import { Navigate, Outlet } from "react-router-dom";
import {useAppSelector } from "../Redux/hook";

// this private route checks the token (authenticated)
// we can now nest routes with this method
const PrivateRoutes = () => {
  const token = useAppSelector((state)=> state.authenticate.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
