# Projet

Le projet consiste à développer un site web pour un restaurant de sushi. Ce site aura pour but de présenter le restaurant, son menu, ses spécialités, et de permettre aux clients de passer des commandes en ligne, et d’interagir avec le restaurant via un blog ou une newsletter. Le site doit refléter l’image de marque du restaurant, en mettant en avant la qualité des produits, l’authenticité de la cuisine japonaise, et une expérience utilisateur agréable.


## Fonctionnalités

Les visiteurs pourront s authentifier (inscription/connexion).
Il seront `utilisateurs` et pourront mettre des produits dans le panier et commander ces produits.

Un `administrateur` aura accès au panneau d administration avec les fonctionnalités suivantes :

- Afficher le status des commandes.
- Gérer les utilisateurs. 
- Gérer les produits.     

## MCD

> _voir schéma_

Users → Orders :
Un utilisateur (Users) peut avoir plusieurs commandes (Orders).
Relation : 1-n.
Orders → OrderProducts :
Une commande (Orders) peut contenir plusieurs produits (OrderProducts).
Relation : 1-n.
Products → OrderProducts :
Un produit (Products) peut être associé à plusieurs commandes (OrderProducts).
Relation : 1-n.
Categories → Products :
Une catégorie (Categories) peut contenir plusieurs produits (Products).
Relation : 1-n.
Products → Images :
Un produit (Products) peut avoir plusieurs images (Images).
Relation : 1-n.

## MLD

Users (id, firstname, lastname, email, password, created_at, role)
Orders (id, user_id, status, total_price, created_at)
Categories (id, label)
Products (id, label, description, price, category_id, stock, created_at)
OrderProducts (id, order_id, product_id, quantity, unit_price)
Images (id, product_id, url, is_primary)

## MPD

```sql
-- Table des utilisateurs
CREATE TABLE Users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NULL,
    password CHAR(60) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    role ENUM('user', 'admin') DEFAULT 'user'
);

-- Table des commandes
CREATE TABLE `Orders` (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id  INT UNSIGNED NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Table des catégories
CREATE TABLE Categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL   
);

-- Table des produits
CREATE TABLE Products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT UNSIGNED NULL,
    stock SMALLINT UNSIGNED DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL
);

-- Table pivot pour les produits dans une commande
CREATE TABLE OrderProducts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity SMALLINT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Orders`(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- Table des images de produits
CREATE TABLE Images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_primary TINYINT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);


