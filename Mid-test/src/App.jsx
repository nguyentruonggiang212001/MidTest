import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductTable from "./pages/ProductTable";
import ProductsForm from "./pages/ProductsForm";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import { ProductProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/products/add" element={<ProductsForm />} />
          <Route path="/products/update/:id" element={<ProductsForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
