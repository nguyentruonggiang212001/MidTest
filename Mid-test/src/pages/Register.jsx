import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerForm } from "../schemas/auSchema";
import instance from "../services";

const Register = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerForm),
  });

  const subMit = async (user) => {
    const register = await instance.post("/register", user);
    console.log(register);

    if (register.status && confirm("Do you want go to page login ?")) {
      nav("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(subMit)}>
        <h1>Register Form</h1>
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
          <label htmlFor="confirm" className="form-label">
            ConfirmPassword
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-danger">{errors.confirm.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
