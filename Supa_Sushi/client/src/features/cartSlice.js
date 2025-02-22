import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../utils/local-storage";

const initialState = loadFromLocalStorage("cart") || [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            //console.log("Produit ajouté :", action.payload);
            const product = action.payload;
            const existingProduct = state.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.push({ ...product, quantity: 1 });
            }
        },

        removeFromCart(state, action) {
            const productId = action.payload;
            return state.filter(item => item.id !== productId);
        },

        decrementQuantity(state, action) {
            const productId = action.payload;
            const existingProduct = state.find(item => item.id === productId);
        
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    // Si la quantité est 1, on le retire complètement
                    return state.filter(item => item.id !== productId);
                }
            }
        },
        
        clearCart() {
            return [];
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
