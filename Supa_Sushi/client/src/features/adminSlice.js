import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  products: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const { setUsers, setProducts, deleteUser, deleteProduct, addProduct } = adminSlice.actions;
export default adminSlice.reducer;
