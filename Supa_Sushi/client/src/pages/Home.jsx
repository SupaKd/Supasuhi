import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import notFoundImg from "/not-found.png";
import AddToCartBtn from "../UI/AddToCartBtn";
import useCloseMenu from "../hooks/useCloseMenu";

function Home() {
    useCloseMenu();
    const { infos: { firstname } } = useSelector((state) => state.auth);
    const [products, setProducts] = useState(null);
    const [filteredCategory, setFilteredCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://localhost:9000/api/v1/products");
                if (res.ok) {
                    const { datas } = await res.json();
                    setProducts(datas);
                } else {
                    setError("Erreur lors du chargement des produits");
                }
            } catch (error) {
                console.error(error);
                setError("Erreur lors du chargement des produits");
            }
        }
        fetchProducts();
    }, []);

    function handleImage(product) {
        if (product.image_urls[0]) {
            return "/img/" + product.image_urls[0];
        } else return notFoundImg;
    };

    const filterByCategory = (categoryId) => {
        setFilteredCategory(categoryId);
    };

    const filteredProducts = filteredCategory
        ? products?.filter(product => product.category_id === filteredCategory)
        : products;

    if (error) return <p>Erreur : {error}</p>;
    if (!products) return <p>Chargement ...</p>;

    return (
        <main className="home">
            <h1>Bienvenue {firstname}</h1>

            <section>
                <div className="filter-buttons">
                    <button onClick={() => setFilteredCategory(null)}>Tous</button>
                    <button onClick={() => filterByCategory(1)}>Sushi</button>
                    <button onClick={() => filterByCategory(2)}>Maki</button>
                    <button onClick={() => filterByCategory(3)}>Ramen</button>
                </div>

                {filteredProducts.map((product) => (
                    <article key={product.id} className="product-card">
                        <h2>{product.label}</h2>
                        <img src={handleImage(product)} alt={product.label} />
                        <p>{product.description}</p>
                        <p>Prix: {product.price}€</p>
                        <AddToCartBtn product={product} />
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Home;