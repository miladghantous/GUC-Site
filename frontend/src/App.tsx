import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Announcement from "./pages/Announcment";

const queryClient = new QueryClient();

function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/announcements" element={<Announcement />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
