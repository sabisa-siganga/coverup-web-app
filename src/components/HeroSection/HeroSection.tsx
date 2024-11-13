"use client";

import React from "react";
import "./HeroSection.scss";
import Image from "next/image";
import Link from "next/link";
import BenefitsSection from "../BenefitsSection/BenefitsSection";
import ListItemsSection from "../ListItemsSection/ListItemsSection";
import BlueCircles from "../BlueCircles/BlueCircles";

const data = [
  {
    description: "Relieving financial burden on family",
  },
  {
    description: "Offers best prices from top funeral parlor.",
  },
  {
    description: "National Coverage.",
  },
  {
    description: "Cultural and Religious Sensitivity",
  },
  {
    description: "A straightforward and hassle-free claims process",
  },
];

const saveList = [
  {
    description: "View and sign contracts electronically",
  },
  {
    description: "Make amendments and updates with ease",
  },
  {
    description: "Store documents securely",
  },
  {
    description:
      "Regular updates and clear information about any changes to the scheme",
  },
];

const HeroSection = () => {
  return (
    <div className="hero-page-container">
      <div className="first-section-container">
        <BlueCircles className="elipse2" />

        <div className="first-hero-section">
          <div className="paragraph-container">
            <p className="scheme-text">
              Cover<span>Up</span> secures your family with the right burial
              plan when it matters most.
            </p>
          </div>

          <div className="second-section-hero">
            <div className="secimage-list-cont">
              <Image
                src="/hero/home-image1.jpg"
                alt="hero-image"
                width={400}
                height={100}
                className="family-img"
              ></Image>
              <div className="hero-card-cont">
                <div className="hero-card">
                  <div className="hero-text">
                    Simplified Burial Planning in The Palm of Your Hand
                  </div>
                  <p className="steps-text">Plan Ahead, Live Without Worry</p>
                </div>
                <div className="hero-btn-cont">
                  <Link className="btn" href="/#" passHref>
                    Start your comparison
                  </Link>
                </div>
              </div>
            </div>

            {/* <BlueCircles className="elipse3" /> */}
          </div>
        </div>
      </div>

      <div className="second-part-cont">
        <div className="hero-container-list">
          <div className="hero-list-heading">Importance of Burial Schemes</div>
          <p className="hero-list-paragraph">
            A burial scheme ensures that funeral costs are covered, allowing
            your loved ones to focus on healing
          </p>
          <ListItemsSection list={data} itemsStyle="hero-items" />
        </div>

        <BlueCircles className="ellipse6" />

        <div className="elipse-turtle-cont">
          <BlueCircles className="elipse4" />

          <div className="second-part-image">
            <Image
              src="/assets/list-image.svg"
              alt="list-image"
              width={300}
              height={100}
              className="tortoise-img"
            ></Image>
          </div>
        </div>
      </div>

      <div className="page-second-section">
        <div className="features-title text-center">
          Save time and money by comparing burial schemes in one place.
        </div>

        <div className="feature-container">
          <div className="elipse-image-container">
            {/* <Image
              src="/assets/half-pat.svg"
              alt="pat-bg"
              width={300}
              height={100}
              className="pat-photo"
            ></Image> */}

            <BlueCircles className="elipse5" />

            <div className="image-container">
              <Image
                src="/assets/greeny.svg"
                alt="greeny"
                width={300}
                height={100}
                className="greeny-img"
              ></Image>
            </div>
          </div>
          <div className="save-list-cont">
            <ListItemsSection list={saveList} itemsStyle="save-items" />
            <BlueCircles className="elipse7" />
          </div>
        </div>
      </div>

      <BenefitsSection />
    </div>
  );
};

export default HeroSection;
