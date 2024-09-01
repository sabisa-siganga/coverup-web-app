"use client";

import React, { useState } from "react";
import "./PolicyDetails.scss";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useDispatch } from "react-redux";
import { submitPolicyDetails } from "@/store/slices/idNumberSlice";
import DetailsCard from "@/components/PolicyDetailsCard/PolicyDetailsCard";

const policyOptions = [
  {
    image: "/members/single-member.svg",
    cardTitle: "Main member",
    cardDescription: "Burial scheme focused solely on the main member.",
    value: "Main member",
  },
  {
    image: "/members/couple.svg",
    cardTitle: "Main member and spouse",
    cardDescription:
      "The main member and their spouse are the only ones included in the burial scheme.",
    value: "Main member and spouse",
  },
  {
    image: "/members/family.svg",
    cardTitle: "Main member, spouse and children",
    cardDescription: "Cover for intermediate family members.",
    value: "Main member, spouse and children",
  },
  {
    image: "/members/extended-family.svg",
    cardTitle: "Extended Family Cover",
    cardDescription: "Burial scheme designed around the extended family.",
    value: "Extended Family Cover",
  },
];

const PolicyDetails = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputValue) {
      dispatch(submitPolicyDetails(inputValue));
      router.push("/quotation/extra-options");
    } else {
      alert("Please select option");
    }
  };

  return (
    <div className="policy-details-container">
      <ProgressBar currentStep={3} className="policy-step-no" />

      <div className="policy-details">
        <BlueCircles className="circle1" />
        <div className="policy-details-title">Members</div>
        <div className="policy-details-description">
          Choose which members you want to be part of your cover.
        </div>
      </div>

      <BlueCircles className="circle2" />
      <div className="member-pat-container">
        <div className="members-bg-pat">
          <Image
            src="/assets/whole-pat.svg"
            width={500}
            height={200}
            alt="member-bg"
          />
        </div>

        <div className="members-cont-options">
          <div className="members-container">
            {policyOptions.map((option, index) => {
              return (
                <DetailsCard
                  key={index}
                  name="content"
                  image={option.image}
                  title={option.cardTitle}
                  description={option.cardDescription}
                  titleStyle="member-title-style"
                  className="member-card"
                  id={`radio-input-${index}`}
                  value={option.value}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </div>
        <BlueCircles className="circle3 " />
      </div>

      <div className="member-page-btns">
        <Link href="/quotation/confirm-details" passHref>
          Back
        </Link>
        <Button color="primary" onClick={onBtnClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PolicyDetails;
