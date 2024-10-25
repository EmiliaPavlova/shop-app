import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // const response = await fetch('/src/data/products.json');
        // const data = await response.json();
        // return data;
        return productsData;
    }
);

export const fetchVouchers = createAsyncThunk(
    'products/fetchVouchers',
    async () => {}
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch products';
            });
        // fetchProducts
        // fetchVouchers
    },
});

export default productsSlice.reducer;
