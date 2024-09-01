"use client";

import React from "react";
import "./HelpSection.scss";
import Image from "next/image";
import ListItemsSection from "../ListItemsSection/ListItemsSection";
import BlueCircles from "../BlueCircles/BlueCircles";

const data = [
  {
    description: (
      <>
        <span>Speed and Ease:</span> Find and compare burial schemes quickly
        with our user friendly platform
      </>
    ),
  },
  {
    description: (
      <>
        <span>Guidance:</span> We guide bread winners to make informed
        decisions, ensuring their families are taken care of in the event of
        death
      </>
    ),
  },
  {
    description: (
      <>
        <span>Speed and Ease:</span> Find and compare burial schemes quickly
        with our user friendly platform
      </>
    ),
  },
];

const HelpSection = () => {
  return (
    <div className="help-container">
      <div className="pat-bg-cont">
        <div className="help-background-pat">
          <Image
            src="/assets/help-pat-bg.svg"
            width={100}
            height={100}
            alt="pat"
          />
        </div>
        <div className="help-image-container">
          <Image src="/help/help.svg" width={100} height={100} alt="help" />
        </div>
      </div>
      <div className="help-text-container">
        <div className="help-title">How we help you</div>
        <ListItemsSection list={data} itemsStyle="list-help-cont" />
      </div>

      {/* <BlueCircles className="elipse9" /> */}
      {/* <BlueCircles className="elipse8" /> */}
    </div>
  );
};

export default HelpSection;
