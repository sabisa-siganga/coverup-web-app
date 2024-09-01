"use client";

import React, { forwardRef } from "react";
import "./CheckBox.scss";
import { FaCheck } from "react-icons/fa";
import { FieldErrors } from "react-hook-form";

interface Props {
  content?: string;
  isChecked?: boolean;
  id: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelStyle?: string;
  iconStyle?: string;
  errors?: FieldErrors;
  type?: "checkbox" | "radio";
  value?: string;
  defaultChecked?: boolean;
}

const CheckBox = (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  const {
    content,
    isChecked,
    onChange,
    id,
    className,
    labelStyle,
    iconStyle,
    name,
    errors,
    type = "checkbox",
    value,
    defaultChecked,
  } = props;

  const error = errors && name && errors[name];

  return (
    <div className={`${className || ""}`}>
      <label htmlFor={id} className="checkbox-label">
        <div className="input-field-container">
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            checked={isChecked}
            value={value}
            defaultChecked={defaultChecked}
          />
          <div className={`check-icon ${iconStyle || ""}`}>
            <FaCheck />
          </div>
        </div>
        {content && (
          <div className={`field-label-container ${labelStyle || ""}`}>
            {content}
          </div>
        )}
      </label>

      {error && <p className="error-message">{error.message?.toString()}</p>}
    </div>
  );
};

const CheckBoxField = forwardRef(CheckBox);
export default CheckBoxField;
