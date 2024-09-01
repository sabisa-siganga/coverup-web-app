import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import React, { useState } from "react";
import "./EditForm.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { saIdParser } from "../../helpers/helper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { submitIDSuccess } from "@/store/slices/idNumberSlice";

interface FormData {
  number: string;
  fullName: string;
  date: string;
}

interface EditFormProps {
  initialData: FormData;
  onSave: (FormData: FormData) => void;
  onCancel: () => void;
}

interface FormInputProps {
  name: string;
  email: string;
  password: string;
}

const EditForm: React.FC<EditFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: initialData,
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.put("/api/update-details", {
        idNumber: data.number,
        fullName: data.fullName,
        dateOfBirth: data.date,
      });

      if (response.status !== 201) {
        throw new Error("Failed to submit");
      }

      // onSave(formattedData);
      onSave(data);
      dispatch(
        submitIDSuccess({
          idNumber: data.number,
          fullName: data.fullName,
          dateOfBirth: data.date,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="number"
          {...register("number", {
            required: "ID number is required",
            maxLength: {
              value: 13,
              message: "ID Number must be 13 digits",
            },
            minLength: {
              value: 13,
              message: "ID Number must be 13 digits",
            },
            validate: (value) => {
              return saIdParser(value);
            },
          })}
          name="number"
          defaultValue={initialData.number}
          className="edit-input"
          label="ID Number"
          errors={errors}
        />
        <InputField
          type="text"
          {...register("fullName", { required: "Full Name is required" })}
          name="fullName"
          defaultValue={initialData.fullName}
          className="edit-input"
          label="Full Name"
          errors={errors}
        />
        <InputField
          type="date"
          {...register("date", {
            required: {
              value: true,
              message: "Date of birth is required",
            },
          })}
          name="date"
          defaultValue={initialData.date}
          className="edit-input"
          label="Date of birth"
          errors={errors}
        />

        <div className="form-btns">
          <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="secondary" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
