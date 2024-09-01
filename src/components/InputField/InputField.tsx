import React, { forwardRef } from "react";
import "./InputField.scss";
import { FieldErrors } from "react-hook-form";

interface InputFieldProps {
  type: "text" | "number" | "date" | "email" | "tel";
  value?: string | number;
  name: string;
  id?: string;
  className?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errors?: FieldErrors;
  pattern?: string;
  defaultValue?: string;
}

const Input = (
  props: InputFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    type,
    value,
    onChange,
    errors,
    name,
    id,
    className,
    label,
    placeholder,
    pattern,
    defaultValue,
  } = props;

  const error = errors && errors[name];

  return (
    <div className={`input-field-container ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        ref={ref}
        type={type}
        name={name}
        pattern={pattern}
        onChange={onChange}
        value={value}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {error && <p className="error-message">{error.message?.toString()}</p>}
    </div>
  );
};

const InputField = forwardRef(Input);

export default InputField;
