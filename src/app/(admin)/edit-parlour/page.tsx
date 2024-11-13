"use client";

import React from "react";
import AddEditForm from "../../../components/AddEditForm/AddEditForm";
import {
  editParlour,
  ParlourInfo,
  UserInfoState,
} from "@/store/slices/parlourSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const EditParlour = () => {
  const dispatch = useDispatch();
  const route = useRouter();

  const onEdit = (formData: ParlourInfo) => {
    console.log(formData);
    dispatch(editParlour({ index: formData.index, data: formData.data }));
    console.log(formData);
    route.push("/manage-parlours");
  };

  return (
    <div className="add-parlour-container">
      <AddEditForm
        formTitle="Edit Funeral Parlour"
        formSubtitle="Please Edit Funeral Parlour Information "
        submitButtonLabel="Save Changes"
        onEdit={onEdit}
        action="edit"
      />
    </div>
  );
};

export default EditParlour;
