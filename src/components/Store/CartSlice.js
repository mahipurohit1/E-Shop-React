import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
      const item = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        rating: action.payload.rating,
        image: action.payload.image,
      };
      state.cartItems.push(item);
    },
    removeItemFromCart(state, action) {
      state.totalQuantity--;
      const selectedId = action.payload;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedId
      );
      state.totalPrice -= selectedItem.price;
      const updateItem = state.cartItems.filter((item) => {
        return item.id !== selectedId;
      });
      state.cartItems = updateItem;
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addItemToCart, removeItemFromCart, resetCart } =
  cartSlice.actions;
