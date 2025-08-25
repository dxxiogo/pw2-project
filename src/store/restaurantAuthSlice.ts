import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Restaurant = {
  id: number;
  name: string;
  email: string;
  cnpj: string;
};

interface AuthState {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
  items: Item[];
}
const initialState: AuthState = {
  restaurant: JSON.parse(localStorage.getItem("restaurant") || "null"),
  loading: false,
  error: null,
  items: [],
};


export const loginRestaurant = createAsyncThunk(
  "restaurantAuth/loginRestaurant",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3001/restaurants?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 0) {
        return thunkAPI.rejectWithValue("Email ou senha inválidos");
      }

      const restaurant = data[0];
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
      return restaurant;
    } catch {
      return thunkAPI.rejectWithValue("Erro ao conectar com o servidor");
    }
  }
);

type Item = {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
};

export const registerRestaurant = createAsyncThunk(
  "restaurantAuth/registerRestaurant",
  async (
    { name, email, cnpj, password }: { name: string; email: string; cnpj: string; password: string },
    thunkAPI
  ) => {
    try {
      // pega todos os restaurantes pra calcular próximo ID
      const resAll = await fetch("http://localhost:3001/restaurants");
      const restaurants = await resAll.json();

      const nextId =
        restaurants.length > 0
          ? Math.max(...restaurants.map((r: Restaurant) => Number(r.id) || 0)) + 1
          : 1;


      const newRestaurant = { id: nextId, name, email, cnpj, password };

      const res = await fetch("http://localhost:3001/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRestaurant),
      });

      if (!res.ok)
        return thunkAPI.rejectWithValue("Erro ao cadastrar restaurante");

      const restaurant = await res.json();
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
      return restaurant;
    } catch {
      return thunkAPI.rejectWithValue("Erro ao conectar com o servidor");
    }
  }
);



const restaurantAuthSlice = createSlice({
  name: "restaurantAuth",
  initialState,
  reducers: {
    logoutRestaurant: (state) => {
      state.restaurant = null;
      localStorage.removeItem("restaurant");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload as Restaurant;
      })
      .addCase(loginRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload as Restaurant;
      })
      .addCase(registerRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const { logoutRestaurant } = restaurantAuthSlice.actions;
export default restaurantAuthSlice.reducer;
