"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";
import "./Login.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Image from "next/image";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import InputField from "@/components/InputField/InputField";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const route = useRouter();

  const onLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/api/admin/login", data);

      if (response.status === 200) {
        route.push("/manage-parlours");
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Incorrect email or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div>
        <div className="sub-title-login">Welcome back!</div>
        <div className="signin-image-container">
          <Image
            src="/signup/signup-img.svg"
            width={500}
            height={200}
            alt="signup-img"
          />
        </div>
        <form onSubmit={handleSubmit(onLogin)}>
          <BlueCircles className="signin-circle1" />
          <BlueCircles className="signin-circle2" />
          <BlueCircles className="signin-circle3" />
          <div className="login-inputs">
            <InputField
              type="email"
              placeholder="jonsnow@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
              errors={errors}
            />
            <InputField
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              errors={errors}
            />
          </div>
          <div className="auth-links">
            <Link href="#" passHref>
              Forgot Password?
            </Link>

            <Link href="#">Two-Factor Authentication</Link>
          </div>
          <div className="signin-btns">
            <Link href="/admin/landing-page" passHref>
              Back
            </Link>

            <Button color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
