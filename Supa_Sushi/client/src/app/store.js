import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/themeSlice";

import cartReducer from "../features/cartSlice";
import menuReducer from "../features/menuSlice";
import authReducer from "../features/authSlice";
import adminReducer from "../features/adminSlice";

const store = configureStore({
	reducer: {
		theme: themeReducer,
		cart: cartReducer,
		menu: menuReducer,
		auth: authReducer,
		admin: adminReducer,
	},
});

export default store;
