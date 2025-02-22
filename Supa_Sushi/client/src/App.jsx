import { useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
	const location = useLocation(); // hook qui permets de récupérer les paramètres dans l'url lié à la navigation

    // fonction qui permets d'affecter un "id" dynamique au <main> en fonction de la page affichée
	function handlePathname() {
		return location.pathname === "/"
			? "home"
			: location.pathname.slice(1, location.pathname.length);
	}

	return (
		<div className="App">
			<Header />
			<main className="container" id={handlePathname()}>
				<AppRoutes /> {/* appel d'un composant de gestion de route pour déléguer cette responsabilité */}
			</main>
			<Footer />
		</div>
	);
};

export default App;
