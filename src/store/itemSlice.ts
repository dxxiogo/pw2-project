import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurantId: number;
};

type ItemsState = {
  items: Item[];
  currentItem: Item | null;
  loading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
};

// Criar item
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



export const fetchItemById = createAsyncThunk<Item, number>(
  "items/fetchItemById",
  async (id) => {
    const res = await fetch(`http://localhost:3001/items/${id}`);
    if (!res.ok) throw new Error("Erro ao carregar item");
    return await res.json();
  }
);

export const updateItem = createAsyncThunk<Item, Item>(
  "items/updateItem",
  async (item) => {
    const res = await fetch(`http://localhost:3001/items/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) throw new Error("Erro ao atualizar item");
    return await res.json();
  }
);

export const deleteItem = createAsyncThunk<number, number>(
  "items/deleteItem",
  async (id) => {
    const res = await fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar item");
    return id; 
  }
);

export const fetchRestaurantItems = createAsyncThunk<Item[], number>(
  "items/fetchRestaurantItems",
  async (restaurantId) => {
    const res = await fetch(`http://localhost:3001/items?restaurantId=${restaurantId}`);
    console.log(res)
    if (!res.ok) throw new Error("Erro ao carregar itens");
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
      })

      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action: PayloadAction<Item>) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar item";
      })

      .addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.loading = false;
        state.currentItem = action.payload;
        state.items = state.items.map((i) =>
          i.id === action.payload.id ? action.payload : i
        );
      })

      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter((i) => i.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      });
  },
});

export default itemsSlice.reducer;
