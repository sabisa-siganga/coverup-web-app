import React from "react";
import "./CardPolicy.scss";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";

interface Props {
  className: string;
  // children: React.ReactNode;
  monthlyPay?: string;
  claim?: string;
  option: string;
  image: string;
  description: string;
  benefits: string;
}
const CardPolicy = (props: Props) => {
  const { className, monthlyPay, claim, option, image, description, benefits } =
    props;

  console.log(props);

  return (
    <div className="card-container">
      <div className="single-card">
        <div className="img-title flex justify-center">
          <div className=" policy-img">
            <Image width={800} height={500} alt="policy" src={image} />
          </div>
          <div className="option-text">{option}</div>
        </div>
        <div className="list-text">
          <div className="card-description">{description}</div>
          <div className="card-description">{benefits}</div>
          <div className="card-text">{monthlyPay}</div>
          <div className="card-text">{claim}</div>
        </div>
        <div className="select-cover-links">
          {/* <Link href="#" passHref className="card-link">
            Learn more
          </Link> */}
          <Link href="/contact" passHref className="card-link">
            I'm interested
          </Link>
        </div>
      </div>

      <div className={`policy-container  ${className}`}>
        <div className="blue-card-title">
          Premium <br />
          2024 Monthly contributions
        </div>
        <div className="member">Main Member</div>
        <ul className="card-list">
          <li className="item">Pay as little as R100 pm</li>
          <li className="item">You can claim up to R10 000</li>
          <li className="item">+ Spouse </li>
          <li className="item">+ Children </li>
          <li className="item">+ Extended Family</li>
        </ul>
      </div>
    </div>
  );
};

export default CardPolicy;
