// Hook pour fermer automatiquement le menu lorsqu'il est appelé dans un composant.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleMenu } from "../features/menuSlice";

function useCloseMenu() {
	const dispatch = useDispatch();
	const { isMenuOpen } = useSelector((state) => state.menu);

	useEffect(() => {
		if (isMenuOpen) dispatch(toggleMenu());
	}, []);
}

export default useCloseMenu;