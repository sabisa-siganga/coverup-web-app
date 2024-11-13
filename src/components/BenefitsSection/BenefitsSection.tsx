import React from "react";
import "./BenefitsSection.scss";
import BenefitsCard from "../BenefitsCard/BenefitsCard";
import Image from "next/image";
import HelpSection from "../HelpSection/HelpSection";
import ListItemsSection from "../ListItemsSection/ListItemsSection";
import BlueCircles from "../BlueCircles/BlueCircles";

const benefits = [
  {
    image: "/cards/invesment.png",
    title: "Cost-Effective",
    description:
      "Burial schemes usually involve lower premiums compared to comprehensive funeral policies. The contributions are pooled within the community or group, which can reduce the overall cost for each member",
  },
  {
    image: "/cards/process.png",
    title: "Simplified Claims Process",
    description:
      "Since the scheme is managed by the funeral undertaker, the process of claiming the benefits is straightforward. There is no need to navigate through insurance claim procedures, as the undertaker will directly provide the agreed-upon services",
  },
  {
    image: "/cards/operator.png",
    title: "Immediate Assistance",
    description:
      "Funeral undertakers can provide immediate assistance upon the death of a member, handling all necessary arrangements promptly. This immediate support is crucial during a time of grief",
  },
  {
    image: "/cards/wrench.png",
    title: "Customized Services",
    description:
      "These schemes often include personalized services tailored to the deceased's and family's wishes, ensuring a respectful and appropriate funeral",
  },
  {
    image: "/cards/protection.png",
    title: "No Medical Examinations",
    description:
      "Typically, burial schemes do not require medical examinations for membership, making them accessible to a broader range of people, including those who might have difficulty obtaining traditional funeral insurance due to health issues.",
  },
];
const schemeItems = [
  {
    title: "Guaranteed Services: ",
    description:
      "Burial schemes typically offer guaranteed funeral services as part of the plan. This can include a coffin, hearse, and burial or cremation services, ensuring that essential funeral arrangements are covered without additional stress or financial burden on the family. ",
  },
  {
    title: "Peace of Mind",
    description:
      "Knowing that funeral arrangements are pre-planned and paid for can provide peace of mind to both the individual and their family. This allows the family to focus on mourning and celebrating the life of the deceased without worrying about logistics and expenses. ",
  },
  {
    title: "Community and Cultural Alignment",
    description:
      "Many burial schemes are community-based and managed by local funeral undertakers who understand the specific cultural and traditional requirements of the community. This ensures that funeral services align with personal and cultural preferences",
  },
  {
    title: "Affordability and Flexibility",
    description:
      "Burial schemes often allow for small, regular contributions, making it an affordable way to ensure funeral costs are covered. This can be particularly helpful for individuals who might not have the means to pay for a comprehensive funeral policy upfront. ",
  },
];

const benefitsList = [
  {
    description: (
      <>
        <span> Financial Relief: </span>
        These schemes ensure professional management of all logistical aspects
        of the funeral by providing essential items like coffins, chairs, and
        tents.
      </>
    ),
  },
  {
    description: (
      <>
        <span>Comprehensive Funeral Services: </span>
        The contributions paid by members guarantee specific funeral services
        such as the coffin, hearse, and burial or cremation.
      </>
    ),
  },
  {
    description: (
      <>
        <span>Peace of Mind: </span>
        Knowing that funeral arrangements are pre-planned and covered allows
        individuals and their families to focus on mourning and celebrating the
        life of the deceased without the added stress of planning and paying for
        the funeral
      </>
    ),
  },
];

const BenefitsSection = () => {
  return (
    <>
      <div className="benefits-section-container">
        <div className="why-section">
          <div className="burial-text">
            <div className="why-heading">What is a burial scheme</div>
            <p className="why-description">
              It is a monthly-paid insurance plan designed to cover essential
              funeral expenses
            </p>
            <BlueCircles className="elipse7" />
            <ListItemsSection
              list={benefitsList}
              itemsStyle="list-benefit-cont"
            />
          </div>

          <div className="burialimage-pat-container">
            {/* <div className="pat-img-cont">
              <Image
                src="/assets/half-pat.svg"
                width={100}
                height={50}
                alt="pat-img"
                className="half-pat-image"
              />
            </div> */}
            <div className="burial-img-cont">
              <Image
                src="/hero/scheme.svg"
                width={100}
                height={50}
                alt="burial-img"
                className="whyscheme-img"
              />
            </div>
            <BlueCircles className="elipse8" />
          </div>
        </div>

        <div className="scheme-info-section">
          <div className="burial-scheme-heading">
            Why should you have a burial scheme{" "}
          </div>

          <div className="info-pat-con">
            {/* <div className="pat-background-cont">
              <Image
                src="/assets/whole-pat.svg"
                width={100}
                height={50}
                alt="wholepat-img"
                className="wholepat-img"
              />
            </div> */}

            <div className="scheme-items">
              {schemeItems.map((data, index) => {
                return (
                  <BenefitsCard
                    key={index}
                    title={data.title}
                    description={data.description}
                    className="scheme-list"
                    titleStyle="scheme-card-title"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="we-help-container">
        <HelpSection />
      </div>

      <div className="outer-benefit-items">
        <div className="benefits-heading">The benefits of a burial scheme</div>
        <div className="benefits-items-container">
          <div className="benefits-items">
            {benefits.map((item, index) => {
              return (
                <BenefitsCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  className="benefit-list"
                  titleStyle="benefit-scheme-title"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsSection;
