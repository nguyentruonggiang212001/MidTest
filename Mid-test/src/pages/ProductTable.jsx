import React, { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { data, Link } from "react-router-dom";
import instance from "../services";

const ProductTable = () => {
  const { state, dispatch } = useContext(ProductsContext);
  console.log(state);

  const handleRemove = async (id) => {
    if (confirm("do you want delete")) {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCTS", payload: id });
    }
  };

  return (
    <div>
      <Link to={"/products/add/"}>
        <button className="btn btn-primary">Add new</button>
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products &&
            state.products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <Link
                    className="btn btn-warning"
                    to={`/products/update/${item.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
