import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice.ts";
import restaurantAuthReducer from "@/store/restaurantAuthSlice.ts";
import itemsReducer from "@/store/itemSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurantAuth: restaurantAuthReducer,
     items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
