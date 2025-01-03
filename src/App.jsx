import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default App;