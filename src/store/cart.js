import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push(product);
            }
        },
        removeProduct: (state, action) => {
            const id = action.payload;
            state.products = state.products.filter(item => item.id !== id);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.products.find(item => item.id === id);

            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
        },
        applyVoucher: (state, action) => {
            const { id, voucherCode } = action.payload;
            const product = state.products.find(item => item.id === id);
            console.log(product)

            if (product) {
                const voucher = product.vouchers.find(v => v.name === voucherCode);
                console.log(voucher, voucherCode)
                if (voucher) {
                    product.appliedVoucher = voucher;
                    const discountAmount = (product.price * voucher.discount) / 100;
                    product.discountedPrice = product.price - discountAmount;
                }
            }
        },
        productsPurchased: (state, action) => {
            state.products = [];
        },
    },
});

export const {
    addProduct,
    removeProduct,
    updateQuantity,
    applyVoucher,
    productsPurchased,
} = cartSlice.actions;

export default cartSlice.reducer;
