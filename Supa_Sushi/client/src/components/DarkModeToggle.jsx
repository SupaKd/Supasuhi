import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";

function DarkModeToggle() {
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            {isDark ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
        </button>
    );
}

export default DarkModeToggle;
