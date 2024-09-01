import React, { forwardRef } from "react";
import "./Select.scss";
import { FieldErrors } from "react-hook-form";

interface SelectProps {
  title: string;
  options: {
    value: string;
  }[];
  errors?: FieldErrors;
  name?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
}

const Select = (
  props: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) => {
  const {
    title,
    options,
    onBlur,
    onChange,
    errors,
    name,
    id,
    placeholder,
    required,
    defaultValue,
  } = props;
  const error = errors && name && errors[name];

  return (
    <div className="select-container">
      <label htmlFor={id} className="select-input">
        {title}
      </label>
      <select
        id={id}
        className={`select-item ${error ? "error" : ""}`}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
      >
        {placeholder && (
          <option value="" className="select-list-item">
            {placeholder}
          </option>
        )}

        {options.map((item, index) => {
          return (
            <option key={index} value={item.value} className="select-list-item">
              {item.value}
            </option>
          );
        })}
      </select>

      {error && <p className="error-message">{error.message?.toString()}</p>}
    </div>
  );
};

const SelectField = forwardRef(Select);

export default SelectField;
