import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurantId: number;
};

type ItemsState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk para criar item
export const createItem = createAsyncThunk<Item, Omit<Item, "id">>(
  "items/createItem",
  async (newItem) => {
    const res = await fetch("http://localhost:3001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error("Erro ao criar item");
    return await res.json();
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Criar item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao criar item";
      });
  },
});

export default itemsSlice.reducer;
