import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { SnackbarProvider } from 'notistack'

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </SnackbarProvider>
  );
}
