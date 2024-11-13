"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import "./ConfirmDetails.scss";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { MdEdit } from "react-icons/md";
import EditForm from "./EditForm";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CheckBoxField from "@/components/CheckBox/CheckBox";
import { updateUserField } from "@/store/slices/userDetailsSlice";
import axios from "axios";
import {
  submitDateOfBirth,
  submitIDSuccess,
} from "@/store/slices/idNumberSlice";
import BlueCircles from "@/components/BlueCircles/BlueCircles";

interface FormData {
  number: string;
  fullName: string;
  date: string;
}

interface PersonalDetailsFormData {
  region: string;
  payment: string;
  cover: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  gender: string;
}

const regionSelect = {
  selectTitle: "Region",
  options: [
    {
      value: "Eastern Cape",
    },
    {
      value: "Kwazulu Natal",
    },
    {
      value: "Free State",
    },
    {
      value: "Gauteng",
    },
    {
      value: "Limpopo",
    },
    {
      value: "Mpumalanga",
    },
    {
      value: "Northern Cape",
    },
    {
      value: "North West ",
    },
    {
      value: "Western Cape",
    },
  ],
};

const paymentSelect = {
  selectTitle: "What is your ideal monthly premium for coverage?",
  options: [
    {
      value: "R100 - R199",
    },
    {
      value: "R200 - R299",
    },
    {
      value: "R300 - R399",
    },
    {
      value: "R400+",
    },
  ],
};

const coverSelect = {
  selectTitle: "Cover Options",
  options: [
    {
      value: "Basic Cover",
    },
    {
      value: "Standard Cover",
    },
    {
      value: "Premium Cover",
    },
  ],
};

const ConfirmDetails = () => {
  const inputRef = useRef<google.maps.places.SearchBox>(null);

  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleOnPlacesChanged = () => {
    if (!inputRef.current) {
      return;
    }

    let address = inputRef.current.getPlaces();
    console.log("address", address);
  };

  const router = useRouter();

  const { data } = useSelector((state: RootState) => state.idNumber);
  const { info } = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (!data.idNumber) {
      router.replace("/quotation");
    }
  }, [data, router]);

  const [status, setStatus] = useState([
    {
      isChecked: false,
      statusItem: "Single",
    },
    {
      isChecked: false,
      statusItem: "Co-habitating",
    },
    {
      isChecked: false,
      statusItem: "Married",
    },
    {
      isChecked: false,
      statusItem: "Divorced",
    },
    {
      isChecked: false,
      statusItem: "Separated",
    },
    {
      isChecked: false,
      statusItem: "Widowed",
    },
  ]);
  const [gender, setGender] = useState([
    {
      isChecked: false,
      genderItem: "Female",
    },
    {
      isChecked: false,
      genderItem: "Male",
    },
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const initalValues: PersonalDetailsFormData = {
    region: "",
    payment: "",
    cover: "",
    address: "",
    email: "",
    phone: "",
    status: "",
    gender: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>({
    mode: "all",
    // defaultValues: initalValues,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (newFormData: FormData) => {
    dispatch(
      submitIDSuccess({
        idNumber: newFormData.number,
        fullName: newFormData.fullName,
        dateOfBirth: newFormData.date,
      })
    );
    setIsEditing(false);
  };

  const onSubmit: SubmitHandler<PersonalDetailsFormData> = async (info) => {
    dispatch(updateUserField(info));

    try {
      const response = await axios.post("/api/create-update-details", {
        ...info,
        idNumber: data.idNumber,
      });

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Failed to submit");
      }

      console.log(response.data);

      router.push("/quotation/policy-details");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ProgressBar currentStep={2} className="step-number" />

      <BlueCircles className="elipse13" />
      <p className="verification-text">
        We&apos;ve retrieved your personal information. Please check that your
        information below is correct and edit / add where needed.
      </p>

      <div className="pat-card-bg">
        {/* <div className="pat-bg">
          <Image
            src="/assets/whole-pat.svg"
            alt="pat-bg"
            width={400}
            height={50}
          />

        </div> */}
        {/* <BlueCircles className="elipse14" /> */}

        <div className="card-info-container">
          {!isEditing ? (
            <>
              <div className="person-icon">
                <Image
                  src="/assets/user.png"
                  alt="person-icon"
                  width={100}
                  height={50}
                />
              </div>
              <div className="person-information-container">
                <div className="person-details">
                  <div className="id-number">{data.idNumber}</div>
                  <div className="full-name">{data.fullName}</div>
                  <div className="date-of-birth">{data.dateOfBirth}</div>
                </div>

                <div className="edit-icon-container">
                  <MdEdit className="edit-icon" onClick={handleEditClick} />
                  <p>Edit</p>
                </div>
              </div>
            </>
          ) : (
            <EditForm
              initialData={{
                number: data.idNumber,
                fullName: data.fullName,
                date: data.dateOfBirth,
              }}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
      <div className="verification-page-container">
        <form className="inputs" onSubmit={handleSubmit(onSubmit)}>
          <div className="marital-status-container">
            <div>
              <div className="status-text">Marital Status</div>
            </div>
            {/* <BlueCircles className="elipse20" /> */}
            <div className="items">
              {status.map((item, index) => {
                return (
                  <CheckBoxField
                    key={`checkbox-${index}`}
                    id={`checkbox-${index}`}
                    type="radio"
                    content={item.statusItem}
                    className="status-label"
                    labelStyle="status-label-text"
                    {...register("status", {
                      required: "Marital Status is required",
                    })}
                    name="status"
                    value={item.statusItem}
                    defaultChecked={item.statusItem === info.status}
                  />
                );
              })}
            </div>
            {errors["status"] && (
              <div className="error-container">
                <p className="error-message">
                  {errors.status.message?.toString()}
                </p>
              </div>
            )}
          </div>

          <div className="gender-container">
            <div>
              <div className="status-text">Gender</div>
            </div>
            <div className="items">
              <div className="item-list">
                {gender.map((item, index) => {
                  return (
                    <CheckBoxField
                      key={`checkbox-${index}`}
                      id={`checkbox-${index}`}
                      type="radio"
                      content={item.genderItem}
                      className="status-label"
                      labelStyle="status-label-text"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      name="gender"
                      value={item.genderItem}
                      defaultChecked={item.genderItem === info.gender}
                    />
                  );
                })}
              </div>
            </div>
            {errors["gender"] && (
              <div className="error-container">
                <p className="error-message">
                  {errors.gender.message?.toString()}
                </p>
              </div>
            )}
          </div>

          <div className="details-inputs-container">
            {/* <div className="details-image-bg">
              <Image
                src="/assets/whole-pat.svg"
                alt="pat-bg"
                width={400}
                height={157}
              />
            </div> */}

            <div className="field-select-inputs">
              <div className="details-inputs">
                {isLoaded && (
                  <StandaloneSearchBox
                    // @ts-ignore
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handleOnPlacesChanged}
                  >
                    <InputField
                      type="text"
                      className="contact-info"
                      label="Address"
                      placeholder="Start typing your address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      defaultValue={info.address}
                      errors={errors}
                    />
                  </StandaloneSearchBox>
                )}
                <InputField
                  type="email"
                  className="contact-info"
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  defaultValue={info.email}
                  errors={errors}
                />
                <InputField
                  type="tel"
                  className="contact-info"
                  label="Phone"
                  placeholder="0123456789"
                  {...register("phone", {
                    required: "Phone is required",
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
                  defaultValue={info.phone}
                  errors={errors}
                />
              </div>
              <div className="details-select-container">
                <BlueCircles className="elipse15" />
                <BlueCircles className="elipse16" />
                <BlueCircles className="elipse17" />
                {/* <Select
                  title={regionSelect.selectTitle}
                  // options={regionSelect.options}
                  {...register("region", {
                    required: "Region is required",
                  })}
                  placeholder="Select Region"
                  errors={errors}
                  id="region"
                  required
                  // defaultValue={info.region}
                  className="details-select"
                />
                <Select
                  title={paymentSelect.selectTitle}
                  // options={paymentSelect.options}
                  {...register("payment", {
                    required: "Payment is required",
                  })}
                  errors={errors}
                  id="payment"
                  placeholder="Select Payment"
                  required
                  // defaultValue={info.payment}
                  className="details-select"
                />
                <Select
                  title={coverSelect.selectTitle}
                  // options={coverSelect.options}
                  {...register("cover", {
                    required: "Cover is required",
                  })}
                  errors={errors}
                  id="cover"
                  placeholder="Select Cover"
                  required
                  // defaultValue={info.cover}
                  className="details-select"
                /> */}
              </div>
            </div>
          </div>

          <div className="confirm-btns">
            <Link className="btn" href="/quotation" passHref>
              Back
            </Link>

            <Button color="secondary" type="submit">
              Next
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ConfirmDetails;
