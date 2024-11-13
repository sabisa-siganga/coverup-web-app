"use client";

import React, { forwardRef, useEffect } from "react";
import Select from "react-select"; // Import react-select component
import "./Select.scss";
import { Control, Controller, FieldErrors } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

// Define the SelectProps interface for the props the component will receive
interface SelectProps {
  title?: string;
  options: SelectOption[];
  errors?: FieldErrors;
  name?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (option: any) => void; // Updated type for react-select's onChange
  // onBlur?: () => void;
  defaultValue?: SelectOption | SelectOption[];
  className?: string;
  showText?: boolean;
  isMulti?: boolean; // For multi-select functionality
  control?: Control<any, any>;
  // setValue?: (name: string, value: any) => void; // React Hook Form's setValue
}

// ForwardRef is still used to support refs passed by parent components
const SelectField = forwardRef<any, SelectProps>((props, ref) => {
  const {
    title,
    options,
    // onBlur,
    onChange,
    errors,
    name,
    id,
    placeholder,
    required,
    defaultValue,
    className,
    showText = false,
    isMulti = false, // Allow multiple selections
    control,
    // setValue, // Set value programmatically
  } = props;

  // Get error message if validation fails
  const error = errors && name && errors[name];

  // useEffect(() => {
  //   if (defaultValue && setValue && name) {
  //     // If defaultValue exists, set it for the field using setValue
  //     setValue(name, defaultValue);
  //   }
  // }, [defaultValue, setValue, name]);

  return (
    <div className={`select-container ${className}`}>
      {title && (
        <label htmlFor={id} className="select-input">
          {title}
        </label>
      )}
      <div className="input-error-cont">
        {!showText && control && (
          <Controller
            name={name || "select"}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  id={id}
                  // defaultMenuIsOpen
                  className={`react-select-container ${error ? "error" : ""}`}
                  classNamePrefix="react-select"
                  options={options} // Set options for react-select
                  isMulti={isMulti} // Enable multi-select if needed
                  placeholder={placeholder || "Select..."} // Placeholder text
                  // onBlur={onBlur} // Handle blur events
                  onChange={(selected) => {
                    field.onChange(selected);
                    console.log(selected);
                  }}
                />
              );
            }}
          />
        )}

        {!showText && !control && (
          <Select
            id={id}
            // defaultMenuIsOpen
            className={`react-select-container ${error ? "error" : ""}`}
            classNamePrefix="react-select"
            ref={ref}
            name={name}
            options={options} // Set options for react-select
            defaultValue={defaultValue} // Set the default selected value
            isMulti={isMulti} // Enable multi-select if needed
            onChange={onChange} // Handle change events
            placeholder={placeholder || "Select..."} // Placeholder text
            // onBlur={onBlur} // Handle blur events
          />
        )}

        {showText && defaultValue && (
          <div>
            {Array.isArray(defaultValue)
              ? defaultValue.map((v) => v.label).join(", ")
              : defaultValue.label}
          </div>
        )}

        {error && <p className="error-message">{error.message?.toString()}</p>}
      </div>
    </div>
  );
});

SelectField.displayName = "SelectField";

export default SelectField;
