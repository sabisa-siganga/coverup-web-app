"use client";

import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import React from "react";
import "./manage-parlours.scss";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import {
  clearParlourForView,
  saveParlourForView,
  UserInfoState,
} from "@/store/slices/parlourSlice";

const ManageParlours = () => {
  const { parlours } = useSelector((state: RootState) => state.parlourInfo);
  const route = useRouter();
  const dispatch = useDispatch();

  const onSave = (data: UserInfoState, index: number) => {
    dispatch(
      saveParlourForView({
        index,
        data,
      })
    );

    route.push("/view-parlour");
  };

  const onEdit = (data: UserInfoState, index: number) => {
    dispatch(
      saveParlourForView({
        index,
        data,
      })
    );
    route.push("/edit-parlour");
  };

  const onAddParlour = () => {
    dispatch(clearParlourForView());

    route.push("/add-parlour");
  };

  return (
    <div className="manage-users-container">
      <div className="admin-profile-container">
        <div className="admin-icon-cont">
          <Image
            src="/admin-portal/admin-icon.png"
            width={40}
            height={40}
            alt="admin-icon"
          />
        </div>
        <div className="admin">
          <div className="user-role">Admin</div>
          <div className="admin-name">Azola Tshobonga </div>
        </div>
      </div>
      <div className="title">Manage Parlours</div>
      <div className="search-filter-cont">
        <div className="inner-container">
          <div className="search-container">
            <InputField
              type="text"
              name="search"
              className="search-field-cont"
              placeholder="Search User"
            />
            <Button color="primary">Search</Button>
          </div>
          <button className="filter">+ Filters</button>
          <button className="filter" onClick={onAddParlour}>
            + Add
          </button>
        </div>
      </div>
      <BlueCircles className="admin-elipse1" />
      <BlueCircles className="admin-elipse2" />
      <BlueCircles className="admin-elipse3" />
      <div className="table-container">
        <div className="table-headings">
          <div className="heading">All Users</div>
          <div className="heading">Registration Date</div>
          <div className="heading">Status</div>
          <div className="heading">Update</div>
        </div>

        <div className="user-info-container">
          {parlours &&
            parlours.map((parlour, index) => {
              return (
                <div className="user-info" key={index}>
                  <button
                    className="user"
                    onClick={(e) => onSave(parlour, index)}
                  >
                    {parlour.parlourName}
                  </button>

                  <div className="registration-date">
                    {parlour.registrationDate}
                  </div>
                  <div className={`user-status ${parlour.status.value}`}></div>

                  <button
                    className="edit-user"
                    onClick={() => onEdit(parlour, index)}
                  >
                    Edit
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ManageParlours;
