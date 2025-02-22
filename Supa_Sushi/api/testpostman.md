http://localhost:9000/api/v1/auth/register

{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane@doe.com",
  "password": "securepassword123"
}

http://localhost:9000/api/v1/auth/login

{
 "email" : "kevin.khek@gmail.com",
 "password" : "12345678"
}

http://localhost:9000/api/v1/auth/logout

{
  "email": "jane@doe.com",
  "password": "securepassword123"
}

http://localhost:9000/api/v1/auth/refresh-login

{
  "email": "jane@doe.com",
  "password": "securepassword123"
}

http://localhost:9000/api/v1/users DELETE (Il faut etre connecter)

http://localhost:9000/api/v1/users PATCH modifier l'user
{
    "firstname": "NouveauPrenom",
    "lastname": "NouveauNom",
    "email": "nouveau.email@example.com"
}


ajout de categorie
http://localhost:9000/api/v1/category
{
    "label": "Sushi"
}

http://localhost:9000/api/v1/category/:id

http://localhost:9000/api/v1/products (passer par form-data)
{
  "label": "Nom du produit",
  "description": "Description ici",
  "price": 19.99,
  "categoryId": 1,
  "stock": 10
  "image" (inserez dans le dossier public upload)
}

http://localhost:9000/api/v1/users/order GET visualiser les commandes

http://localhost:9000/api/v1/users/order inserer une commande avec des produits en meme temps POST
{
    "user_id": 43,
    "total_price": 99.99,
    "products": [
        { "id": 1, "quantity": 2, "unit_price": 10.00 },
        { "id": 2, "quantity": 1, "unit_price": 20.00 }
    ]
}


recuperer tout les utilisateur en tant qu'admin
http://localhost:9000/api/v1/admin