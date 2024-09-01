import Button from "@/components/Button/Button";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import Image from "next/image";
import React from "react";
import "./Registerpage.scss";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="regis-image">
        <Image
          src="/assets/registration.png"
          alt="registration-image"
          width={500}
          height={100}
        />
      </div>

      <ContainerWrapper className="registration-form-container">
        <div className="register-title">Registration Form</div>
        <p>Please fill in the info below to compare burial schemes </p>

        <form>
          <div className="registration-inputs">
            <input type="number" placeholder="ID Number" className="field" />
            <input type="number" placeholder="Birthdate" className="field" />
            <input type="number" placeholder="Gender" className="field" />
            <input
              type="number"
              placeholder="Marital Status"
              className="field"
            />
            <input
              type="number"
              placeholder="Employment Status"
              className="field"
            />
            <input type="number" placeholder="ID Number" className="field" />
          </div>

          <div className="register-wrapper">
            <Link href="/signup" passHref>
              <Button color="secondary">Back</Button>
            </Link>
            <Link href="#" passHref>
              <Button color="secondary">Next</Button>
            </Link>
          </div>
        </form>
      </ContainerWrapper>
    </div>
  );
};

export default RegisterPage;
