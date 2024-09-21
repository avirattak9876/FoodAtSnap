import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item?.card?.info?.id !== id);
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToUpdate = state.items.find(item => item?.card?.info?.id === id);
      if (itemToUpdate) {
          itemToUpdate.quantity += 1;
      }
  },

    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToUpdate = state.items.find(item => item?.card?.info?.id === id);
      if (itemToUpdate && itemToUpdate.quantity > 1) {
          itemToUpdate.quantity -= 1;
      }
  },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
