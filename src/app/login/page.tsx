import Button from "@/components/Button/Button";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import Link from "next/link";
import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <div>
        <ContainerWrapper className="login-card-wrapper">
          <div className="sub-title-login">Welcome back!</div>
          <form>
            <div className="login-inputs">
              <label htmlFor="">
                <input type="email" placeholder="jonsnow@gmail.com" />
              </label>
              <label htmlFor="">
                <input type="password" />
              </label>
            </div>
            <div className="btns-wrapper">
              <Link href="/welcome-page" passHref>
                <Button color="secondary">Back</Button>
              </Link>
              <Link href="/user-dashboard" passHref>
                <Button color="secondary">Login</Button>
              </Link>
            </div>
          </form>
        </ContainerWrapper>
      </div>
    </div>
  );
};

export default Login;
