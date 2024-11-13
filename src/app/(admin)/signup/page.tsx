import React from "react";
import "./SignUpPage.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Image from "next/image";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import InputField from "@/components/InputField/InputField";

const SignUpPage = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-title">Sign Up</div>

      <div className="start-title">Let&apos;s Begin!</div>
      <div className="signup-image-container">
        <Image
          src="/signup/signup-img.svg"
          width={500}
          height={200}
          alt="signup-img"
        />
      </div>

      <form>
        <BlueCircles className="signup-circle1" />
        <BlueCircles className="signup-circle2" />
        <BlueCircles className="signup-circle3" />
        <div className="fullname-container">
          <InputField type="text" name="firstName" placeholder="John" />
          <InputField type="text" name="lastName" placeholder="Doe" />
        </div>

        <div className="long-inputs-container">
          <InputField
            type="email"
            name="emailAddress"
            placeholder="johndoe@gmail.com"
          />
          <InputField type="number" name="number" placeholder="0712345678" />
          <InputField
            type="password"
            name="password"
            placeholder="Create Password"
          />

          <InputField
            type="password"
            name="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="signup-button-wrap">
          <Link href="/admin/landing-page" passHref>
            Back
          </Link>

          <Button color="primary">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
