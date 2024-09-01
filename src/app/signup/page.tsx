import React from "react";
import "./SignUpPage.scss";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import Button from "@/components/Button/Button";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-title">Sign Up</div>
      <ContainerWrapper className="sign-up-wrapper">
        <div className="start-title">Let&apos;s Begin!</div>
        <form>
          <div className="fullname-container">
            <input type="text" placeholder="Name" className="name" />
            <input type="text" placeholder="Surname" className="name" />
          </div>

          <div className="big-inputField">
            <input type="email" placeholder="Email" className="input-field" />
            <input
              type="text"
              placeholder="+0123456789"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </div>
          <div className="signup-button-wrap">
            <Link href="/" passHref>
              <Button color="primary">Back</Button>
            </Link>
            <Link href="/register-page" passHref>
              <Button color="primary">Next</Button>
            </Link>
          </div>
        </form>
      </ContainerWrapper>
    </div>
  );
};

export default SignUpPage;
