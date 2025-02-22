export default (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }
	if (req.user.role === "admin") {
		next();
		return;
	}
	res.status(403).json({ error: "Accès refusé: rôle insuffisant." });
	return;
};
