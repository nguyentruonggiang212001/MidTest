import { createContext, useEffect, useReducer } from "react";
import { productsReducer } from "../reducer/ProductReducer";
import instance from "../services";

export const ProductsContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, { products: [] });

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
