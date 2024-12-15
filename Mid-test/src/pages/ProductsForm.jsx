import { useContext, useEffect } from "react";
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
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (dataBody) => {
    try {
      if (id) {
        const confirmUpdate = window.confirm(
          "Bạn có chắc muốn cập nhật sản phẩm không?"
        );
        if (confirmUpdate) {
          const update = await instance.patch(`/products/${id}`, dataBody);
          if (update.status === 200) {
            dispatch({ type: "UPDATE_PRODUCTS", payload: update.data });
            nav("/products");
          }
        }
      } else {
        const confirmAdd = window.confirm(
          "Bạn có chắc muốn thêm sản phẩm không?"
        );
        if (confirmAdd) {
          const response = await instance.post("/products", dataBody);
          if (response.status === 201) {
            dispatch({ type: "ADD_PRODUCTS", payload: response.data });
            nav("/products");
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
    }

    reset({
      title: "",
      price: "",
      description: "",
    });
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
      })();
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Update" : "Add"}Form </h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
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
