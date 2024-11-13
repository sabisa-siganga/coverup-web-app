"use client";

import Button from "@/components/Button/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import "./Quotation.scss";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { saIdParser } from "../helpers/helper";
import {
  submitIDRequest,
  submitIDSuccess,
  submitIDFailure,
  submitDateOfBirth,
} from "@/store/slices/idNumberSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";
import { RootState } from "@/store/store";
import Image from "next/image";
import BlueCircles from "@/components/BlueCircles/BlueCircles";

interface FormIdData {
  idNumber: string;
}

const initialIdValue: FormIdData = {
  idNumber: "",
};

const QuotationPage = () => {
  const router = useRouter();

  const loading = useSelector((state: RootState) => state.idNumber.loading);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the dispatch hook
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormIdData>({
    mode: "all",
    defaultValues: initialIdValue,
  });

  const extractDOBFromID = (id: string) => {
    // Extract the first 2 digits as the year
    const year = id.substring(0, 2);
    // Extract the next 2 digits as the month
    const month = id.substring(2, 4);
    // Extract the next 2 digits as the day
    const day = id.substring(4, 6);

    // Convert year to 4 digits (ID numbers issued from 1900s to 2000s)
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = parseInt(year) <= currentYear ? `20${year}` : `19${year}`;

    // Format the date in YYYY-MM-DD format
    const formattedDOB = `${fullYear}-${month}-${day}`;

    return formattedDOB;
  };

  const onSubmit: SubmitHandler<FormIdData> = async (data) => {
    setIsLoading(true);
    // Dispatch request action
    dispatch(submitIDRequest());

    try {
      // Make API call using axios
      // const response = await axios.get("/api/id-number", {
      //   params: {
      //     idNumber: data.idNumber,
      //   },
      // });

      // Dispatch success action with response data
      dispatch(
        submitIDSuccess({
          fullName: "",
          idNumber: data.idNumber,
          dateOfBirth: extractDOBFromID(data.idNumber),
        })
      );

      // Navigate to the next page
      router.push("/quotation/confirm-details");
    } catch (error) {
      // Dispatch failure action with error message
      setIsLoading(false);
      dispatch(submitIDFailure("Failed to submit ID number"));
    }
  };

  return (
    <>
      <div className="quote-cont">
        <ProgressBar currentStep={1} className="quote-step-no" />

        <div>
          <div className="quote-first-text">
            Get <span>burial schemes </span>quotes in under 2 minutes.
          </div>
          <BlueCircles className="elipse10" />
          <p className="assurity-text">
            Ensure peace of mind knowing that funeral arrangements are taken
            care of in advance.
          </p>

          <div className="quotation-hero">
            <div className="label-container">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  type="text"
                  className="quote-input"
                  placeholder="Enter your ID number"
                  {...register("idNumber", {
                    required: "ID Number is required",
                    maxLength: {
                      value: 13,
                      message: "ID Number must be 13 digits",
                    },
                    minLength: {
                      value: 13,
                      message: "ID Number must be 13 digits",
                    },
                    validate: (value) => {
                      return saIdParser(value);
                    },
                  })}
                  errors={errors}
                />

                <Button loading={isLoading} color="secondary" type="submit">
                  Next
                </Button>
              </form>

              <div className="quotation-paragraphs">
                <div className="paragraph1">
                  Cover<span>Up </span>
                  is here to help you find the perfect funeral plan for your
                  needs.
                </div>
                <div className="paragraph2">
                  Just follow a few simple steps to compare burial scheme
                  quotes.
                </div>
                <BlueCircles className="elipse12" />
                <BlueCircles className="elipse11" />
              </div>
            </div>
          </div>
        </div>

        <div className="waving-turtle">
          <Image
            src="/assets/waving-turtle.svg"
            width={400}
            height={300}
            alt="waving-turtle"
          />
        </div>
      </div>
    </>
  );
};

export default QuotationPage;
