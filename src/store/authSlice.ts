import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  cpf?: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 0) {
        return thunkAPI.rejectWithValue("Email ou senha inválidos");
      }

      const user = data[0];
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch {
      return thunkAPI.rejectWithValue("Erro ao conectar com o servidor");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { name, email, cpf, password }: { name: string; email: string; cpf: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, cpf, password }),
      });

      if (!res.ok) return thunkAPI.rejectWithValue("Erro ao cadastrar usuário");

      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch {
      return thunkAPI.rejectWithValue("Erro ao conectar com o servidor");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Cadastro
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
