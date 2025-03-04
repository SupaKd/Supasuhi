import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<footer className="footer">
            <section className="footer-content">
                <div className="footer-section">
                    <h3>Adresse</h3>
                    <p>123 Rue Imaginaire</p>
                     <p>69100 Lyon, France</p>
                 </div>

            <div className="footer-section">
                <div className="social-icons">
                    <h3>Suivez-nous</h3>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </a>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                    >
                        <FontAwesomeIcon icon={faYoutube} className="social-icon" />
                    </a>
                     <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    </a>
                </div>
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
            </section>

            <div className="footer-copyright">
                &copy; 2025 - Kevin Khek - My Sushi Shop
            </div>
        </footer>
	);
};

export default Footer;
