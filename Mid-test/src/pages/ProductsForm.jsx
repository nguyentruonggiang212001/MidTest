import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { productSchema } from "../schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import instance from "./../services/index";
import { ProductsContext } from "./../contexts/ProductsContext";

const ProductsForm = () => {
  const { id } = useParams();
  const { dispatch } = useContext(ProductsContext);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (dataBody) => {
    try {
      const response = await instance.post("/products", dataBody);
      if (response.status === 201) {
        dispatch({ type: "ADD_PRODUCT", payload: response.data });
        nav("/products");
        reset();
      }
    } catch (error) {
      console.log();
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Update" : "Add"}</h1>
        <div className="mb-3">
          <label htmlFor="tile" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductsForm;
