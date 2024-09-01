import React from "react";
import "./contact.scss";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-title">Contact Us</div>
      <div className="contact-description">
        We provide expert service for satisfied clients every day. We’d like to
        do the same for you.
      </div>
      <BlueCircles className="circle1" />

      <div className="inputfields-container">
        <div className="top-inputs-container">
          <div className="first-3-inputs">
            <InputField
              type="text"
              name="first-name"
              placeholder="First Name"
              className="field"
            />
            <InputField
              type="text"
              name="contact-number"
              placeholder="Contact number"
              className="field"
            />
            <InputField
              type="text"
              name="inquiry"
              placeholder="inquiry"
              className="field"
            />
          </div>
          <div className="second-2-inputs">
            <InputField
              type="text"
              name="last-name"
              placeholder="Last Name"
              className="field"
            />
            <InputField
              type="text"
              name="email-address"
              placeholder="Email Address"
              className="field"
            />
          </div>
        </div>
        <div className="message">
          <InputField
            type="text"
            name="message"
            placeholder="Message"
            className="field"
          />
        </div>
      </div>
      <div className="turtle">
        <Image
          src="/contact/contact-img.svg"
          width={200}
          height={50}
          alt="contact-img"
        />
      </div>
      <BlueCircles className="circle2" />

      <div className="contact-btn">
        <Button color="secondary">Send</Button>
      </div>
      <BlueCircles className="circle3" />
    </div>
  );
};

export default ContactPage;
