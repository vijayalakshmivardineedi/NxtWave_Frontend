import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import AddResourcePage from "./pages/AddResourcePage";
import ResourceList from "./pages/ResourceList";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddResourcePage />} />
        <Route path="/" element={<ResourceList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;