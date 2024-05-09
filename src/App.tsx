import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RestaurantRegistration from "./Pages/RestaurantRegistration";
import LogIn from "./Pages/LogIn";
import "./App.css";
import ResetPassword from "./Pages/ResetPassword";
import ManageEmployees from "./Pages/ManageEmployees";
import PrivateRoutes from "./Pages/PrivateRoutes";
import PublicRoutes from "./Pages/PublicRoutes";
import { useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "./Redux/hook";

const App = () => {
  const token= useAppSelector((state)=> state.authenticate.token);
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = "Bearer "+token;
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route>

          <Route element={<PublicRoutes />}>
            <Route
              index
              path="/login"
              element={<LogIn />}
            />
            <Route
              path="/restaurantRegistration"
              element={<RestaurantRegistration />}
            />
            <Route path="/resetPassword" element={<ResetPassword/>}/>
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<ManageEmployees />} />
          </Route>

        </Route>
      </Routes>
    </Router>

   
  );
};

export default App;


