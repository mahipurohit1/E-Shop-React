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

      const selectedItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!selectedItem) {
        const item = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
          rating: action.payload.rating,
          image: action.payload.image,
        };
        state.cartItems.push(item);
        state.totalPrice += action.payload.price;
      } else {
        selectedItem.quantity++;
        state.totalPrice += selectedItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.totalQuantity--;
      const selectedId = action.payload;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedId
      );
      state.totalPrice -= selectedItem.price;
      if (selectedItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => {
          return item.id !== selectedId;
        });
      } else {
        selectedItem.quantity--;
      }
    },
    removeFullItemFromCart(state, action) {
      const selectedId = action.payload;
      const selectedItem = state.cartItems.find(
        (item) => item.id === selectedId
      );
      state.totalQuantity -= selectedItem.quantity;
      state.totalPrice -= selectedItem.price * selectedItem.quantity;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== selectedId;
      });
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  removeItemFromCart,
  resetCart,
  removeFullItemFromCart,
} = cartSlice.actions;
