import { Route, Routes } from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/user/Dashboard";
import UpdateUserForm from "../pages/user/updateUserForm";
import Cart from "../pages/user/Cart";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />		
			<Route
				path="dashboard"
				element={
					//<ProtectedRoute>
						<Dashboard />
					//</ProtectedRoute>
				}
			/>
			<Route
				path="update-infos"
				element={
					//<ProtectedRoute>
						<UpdateUserForm />
					//</ProtectedRoute>
				}
			/>

            <Route path="auth/register" element={<Register />} />
            <Route path="auth/login" element={<Login />} />
			<Route path="cart" element={<Cart/>} />
		</Routes>
	);
};

export default AppRoutes;
