"use client";

import React from "react";
import "./contact.scss";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import Image from "next/image";
import SelectField from "@/components/Select/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type FormData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  emailAddress: string;
  enquiry: string;
  message: string;
};

const inquirySelect = {
  options: [
    {
      value: "General Information",
      label: "General Information", // Added label
    },
    {
      value: "Policy Details",
      label: "Policy Details", // Added label
    },
    {
      value: "Claims Process",
      label: "Claims Process", // Added label
    },
    {
      value: "Premium Payments",
      label: "Premium Payments", // Added label
    },
    {
      value: "Coverage Options",
      label: "Coverage Options", // Added label
    },
    {
      value: "Adding/Removing Beneficiaries",
      label: "Adding/Removing Beneficiaries", // Added label
    },
    {
      value: "Updating Personal Information",
      label: "Updating Personal Information", // Added label
    },
    {
      value: "Cancellation of Policy",
      label: "Cancellation of Policy", // Added label
    },
    {
      value: "Technical Support",
      label: "Technical Support", // Added label
    },
    {
      value: "Feedback/Suggestions",
      label: "Feedback/Suggestions", // Added label
    },
    {
      value: "Other",
      label: "Other", // Added label
    },
  ],
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/api/send-email", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!", {
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
        //   reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to send message", {
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
    <>
      <div className="contact-container">
        <div className="contact-title">Contact Us</div>
        <div className="contact-description">
          We provide expert service for satisfied clients every day. We’d like
          to do the same for you.
        </div>
        <BlueCircles className="circle1" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputfields-container">
            <div className="top-inputs-container">
              <InputField
                type="text"
                placeholder="First name"
                className="field"
                {...register("firstName", {
                  required: "First name is required",
                })}
                errors={errors}
              />
              <InputField
                type="text"
                placeholder="Last name"
                className="field"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                errors={errors}
              />
              <InputField
                type="text"
                placeholder="johndoe@gmail.com"
                className="field"
                {...register("emailAddress", {
                  required: "Email address is required",
                })}
                errors={errors}
              />
              <InputField
                type="text"
                placeholder="0712345678"
                className="field"
                {...register("contactNumber", {
                  required: "Contact Number is required",
                  maxLength: {
                    value: 10,
                    message: "Phone Number must be 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone Number must be 10 digits",
                  },
                  pattern: {
                    value: /^0[0-9]{9}$/,
                    message:
                      "Phone Number must start with 0 and be 10 digits long",
                  },
                })}
                errors={errors}
              />

              <SelectField
                options={inquirySelect.options}
                placeholder="Select an enquiry"
                className="query-select"
                {...register("enquiry", {
                  required: "Enquiry selection is required",
                })}
                errors={errors}
              />
              <div className="message">
                <InputField
                  type="text"
                  placeholder="Please write a message"
                  className="field"
                  {...register("message", { required: "Message is required" })}
                  errors={errors}
                />
              </div>
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
            <Button color="secondary" type="submit">
              Send
            </Button>
          </div>
          <BlueCircles className="circle3" />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactPage;
