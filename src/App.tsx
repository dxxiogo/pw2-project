import { Provider } from "react-redux";
import AppRouter from "@/routes/routes.tsx";
import {store} from "@/store/store.ts";

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
