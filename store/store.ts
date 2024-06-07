"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FoodItem {
  id: number;
  name: string;
  description: string;
}

interface FoodState {
  items: FoodItem[];
}

const initialState: FoodState = {
  items: [
    { id: 1, name: "Salad", description: "A healthy salad." },
    { id: 2, name: "Burger", description: "A delicious burger." },
    { id: 3, name: "Pasta", description: "Italian pasta with sauce." },
    {
      id: 4,
      name: "Pizza",
      description: "Cheesy pizza with various toppings.",
    },
    { id: 6, name: "Tacos", description: "Mexican tacos with spicy filling." },
    {
      id: 7,
      name: "Steak",
      description: "Grilled steak cooked to perfection.",
    },
    {
      id: 8,
      name: "Sandwich",
      description: "Club sandwich with ham and cheese.",
    },
    { id: 9, name: "Soup", description: "Warm and hearty vegetable soup." },
    { id: 10, name: "Ice Cream", description: "Creamy vanilla ice cream." },
  ],
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<FoodItem>) {
      state.items.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editItem(state, action: PayloadAction<FoodItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addItem, deleteItem, editItem } = foodSlice.actions;

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
