import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "../schemas/auSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import instance from "../services";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const nav = useNavigate();

  const { setStateUser, stateUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginForm),
  });

  const subMit = async (user) => {
    const login = await instance.post("/login", user);

    if (login.status) {
      localStorage.setItem("user", JSON.stringify(login.data.user));
      localStorage.setItem("accessToken", login.data.accessToken);
      setStateUser(!stateUser);
      nav("/products");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(subMit)}>
        <h1>Login Form</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <Link to="/register">
            <p>Ban co tai khoan chua</p>
          </Link>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
