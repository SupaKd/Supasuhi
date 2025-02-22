import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
	return (
		<footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Adresse</h3>
                    <p>123 Rue Imaginaire</p>
                    <p>69100 Lyon, France</p>
                </div>

                <div className="footer-section">
                    <h3>Liens Utiles</h3>
                    <ul>
                        <li>
                            <a href="/about">À propos</a>
                        </li>
                        <li>
                            <a href="/services">Services</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                        <li>
                            <a href="/privacy-policy">Politique de confidentialité</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright">
            &copy; 2025 - Kevin Khek - My Sushi Shop
            </div>
        </footer>
	);
}

export default Footer;
