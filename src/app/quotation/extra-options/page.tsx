"use client";
import CheckBox from "@/components/CheckBox/CheckBox";
import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import React, { useEffect, useState } from "react";
import "./ExtraOptions.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { submitExtraOptions } from "@/store/slices/idNumberSlice";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import { RootState } from "@/store/store";
import Image from "next/image";

const ExtraOptionsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [list, setList] = useState([
    {
      isChecked: false,
      label: "Tombstone",
      value: "Tombstone",
    },
    {
      isChecked: false,
      label: "Catering",
      value: "Catering",
    },
    {
      isChecked: false,
      label: "Flowers",
      value: "Flowers",
    },
    {
      isChecked: false,

      label: "Draping",
      value: "Draping",
    },
    {
      isChecked: false,
      label: "Video Streaming/Recording",
      value: "Video Streaming/Recording",
    },
    {
      isChecked: false,
      label: "Grocery Benefit",
      value: "Grocery Benefit",
    },
    {
      isChecked: false,
      label: "Mobile Units (Fridge & Toilet)",
      value: "Mobile Units",
    },
    {
      isChecked: false,
      label: "Family Vehicles",
      value: "Family Vehicles",
    },
    {
      isChecked: false,
      label: "Other",
      value: "Other",
    },
  ]);

  const { extraOptions } = useSelector((state: RootState) => state.idNumber);

  useEffect(() => {
    const update = list.map((item) => {
      const find = (extraOptions || []).find((i) => i.value === item.value);

      if (find) {
        item.isChecked = true;
      }

      return item;
    });

    setList(update);
  }, []);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event.target.checked;

    const update = list.map((item, i) => {
      if (index === i) {
        item.isChecked = checked;
      }

      return item;
    });

    setList(update);
  };

  const onNextBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const checkedItems = list.filter((i) => i.isChecked);

    if (checkedItems.length > 0) {
      dispatch(submitExtraOptions(checkedItems));
      router.push("/quotation/cover-options");
    } else {
      alert("Extra options selection required");
    }
  };

  return (
    <div className="extra-options-container">
      <ProgressBar currentStep={4} className="extra-step-no" />
      <BlueCircles className="elipse-a" />
      <div className="page-heading">Extra Options</div>
      <p className="sub-heading">Help us find out what works best for you.</p>
      <BlueCircles className="elipse-b" />

      <div>
        <div className="extra-optionpage-container">
          <form>
            <div className="checkboxes-container">
              <p className="checkbox-title">
                Tick the extra options that best fit you.
              </p>

              <div className="item-list-cont">
                {list.map((item, index) => {
                  return (
                    <CheckBox
                      key={`checkbox-${index}`}
                      id={`checkbox-${index}`}
                      isChecked={item.isChecked}
                      content={item.label}
                      onChange={(event) => onChange(event, index)}
                      className="item-name"
                      labelStyle="label-style"
                      iconStyle="icon-style"
                      value={item.value}
                    />
                  );
                })}
              </div>
            </div>
            <BlueCircles className="elipse-c" />
            <div className="waving-turtle">
              <Image
                src="/assets/waving-turtle.svg"
                width={400}
                height={300}
                alt="waving-turtle"
              />
            </div>

            <div className="extra-options-btns">
              <Link href="/quotation/policy-details" passHref>
                Back
              </Link>

              <Button color="primary" onClick={onNextBtn}>
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExtraOptionsPage;
