import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/local-storage";

const THEME_KEY = "theme";
const DARK_MODE_CLASS = "dark";

const initialState = {
    isDark: loadFromLocalStorage(THEME_KEY) === true, // S'assure que la valeur est bien un booléen
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            saveToLocalStorage(THEME_KEY, state.isDark);
        },
        setTheme: (state, action) => {
            state.isDark = action.payload;
            saveToLocalStorage(THEME_KEY, state.isDark);
        }
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
