import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/local-storage";

const initialState = {
    isDark: loadFromLocalStorage("theme") || false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            saveToLocalStorage("theme", state.isDark);

            if (state.isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
