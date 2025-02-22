import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  isLogged: false, 
  infos: { firstname: "", lastname: "", email: "", role: "" } 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.infos.firstname = action.payload.firstname;
      state.infos.lastname = action.payload.lastname;
      state.infos.email = action.payload.email;
      state.infos.role = action.payload.role; 
    },
    logout() {
      return initialState;
    },
    isAdmin(state) {
      return state.infos.role === "admin"; 
    }
  },
});

export const { login, logout, isAdmin } = userSlice.actions;
export default userSlice.reducer;
