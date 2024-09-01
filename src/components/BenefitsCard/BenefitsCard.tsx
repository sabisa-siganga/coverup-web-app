import React from "react";
import "./BenefitsCard.scss";
import Image from "next/image";

interface Props {
  image?: string;
  title: string;
  titleStyle: string;
  description: string;
  className?: string;
}

const BenefitsCard = (props: Props) => {
  const { image, title, description, className, titleStyle } = props;

  return (
    <div className={`benefits-card-container ${className}`}>
      {image && (
        <div className="benefit-image">
          <Image src={image} width={100} height={50} alt="benefit-image" />
        </div>
      )}
      <div className={` ${titleStyle}`}>{title}</div>
      <div className="benefit-description">{description}</div>
    </div>
  );
};

export default BenefitsCard;
