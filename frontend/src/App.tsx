import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Announcement from "./pages/Announcment";
import Fund from "./pages/Fund";
import Conference from "./pages/Conference";
import FileLink from "./pages/FileLink";
import Evaluation from "./pages/Evaluation";


const queryClient = new QueryClient();

function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/funds" element={<Fund />} />
          <Route path="/conferences" element={<Conference />} />
          <Route path="/filelinks" element={<FileLink />} />
          <Route path="/evaluations" element={<Evaluation />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
