import React, { forwardRef } from "react";
import "./PolicyDetailsCard.scss";
import Image from "next/image";
import { FieldErrors } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

interface Props {
  content?: string;
  isChecked?: boolean;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  image?: string;
  title: string;
  titleStyle: string;
  description: string;
  iconStyle?: string;
  errors?: FieldErrors;
  value: string;
  defaultChecked?: boolean;
}

const PolicyDetailsCard = (
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    isChecked,
    id,
    name,
    onChange,
    className,
    image,
    title,
    titleStyle,
    description,
    iconStyle,
    errors,
    value,
    defaultChecked,
  } = props;

  const error = errors && name && errors[name];

  return (
    <div className="member-card">
      <label htmlFor={id} className="radio-input">
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          onChange={onChange}
          checked={isChecked}
          value={value}
          defaultChecked={defaultChecked}
        />

        <div className="card-content">
          <div className={`check-icon ${iconStyle || ""}`}>
            <FaCheck />
          </div>
          {image && (
            <div className="policy-image">
              <Image src={image} width={100} height={50} alt="policy-image" />
            </div>
          )}
          <div className={`member-title ${titleStyle}`}>{title}</div>
          <div className="member-description">{description}</div>
        </div>
      </label>
    </div>
  );
};

const DetailsCard = forwardRef(PolicyDetailsCard);
export default DetailsCard;
