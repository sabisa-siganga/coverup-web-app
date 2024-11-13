"use client";

import React from "react";
import AddEditForm from "../../../components/AddEditForm/AddEditForm";
import { addParlour, UserInfoState } from "@/store/slices/parlourSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const AddParlour = () => {
  const dispatch = useDispatch();
  const route = useRouter();

  const onSave = (formData: UserInfoState) => {
    dispatch(addParlour(formData));

    route.push("/manage-parlours");
  };
  return (
    <div className="add-parlour-container">
      <AddEditForm
        formTitle="Add Funeral Parlour"
        formSubtitle="Please fill the parlour registration form"
        submitButtonLabel="Save"
        action="adding"
        onSubmit={(data) => onSave(data)}
      />
    </div>
  );
};

export default AddParlour;
