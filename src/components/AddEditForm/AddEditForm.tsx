"use client";

import React, { useEffect, useState } from "react";
import "./AddEditForm.scss";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import BlueCircles from "../BlueCircles/BlueCircles";
import Select, { SelectOption } from "../Select/Select";
import UploadInput from "../Upload/Upload";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deleteParlour,
  ParlourInfo,
  UserInfoState,
} from "@/store/slices/parlourSlice";
import { FaDownload } from "react-icons/fa6";

interface Props {
  action: "viewing" | "edit" | "adding";
  formTitle: string;
  formSubtitle?: string;
  submitButtonLabel?: string;
  onSubmit?: (data: UserInfoState) => void;
  onEdit?: (data: ParlourInfo) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const provinceSelect = {
  selectTitle: "Province",
  options: [
    { value: "", label: "Select province" }, // Default placeholder
    { value: "eastern_cape", label: "Eastern Cape" },
    { value: "kwazulu_natal", label: "Kwazulu Natal" },
    { value: "free_state", label: "Free State" },
    { value: "gauteng", label: "Gauteng" },
    { value: "limpopo", label: "Limpopo" },
    { value: "mpumalanga", label: "Mpumalanga" },
    { value: "northern_cape", label: "Northern Cape" },
    { value: "north_west", label: "North West" },
    { value: "western_cape", label: "Western Cape" },
  ],
};

const mainServicesSelect = {
  selectTitle: "Main Services",
  options: [
    { value: "", label: "Select service(s)" }, // Default placeholder
    { value: "burial", label: "Burial" },
    { value: "repatriation of remains", label: "Repatriation of remains" },
    {
      value: "cross-border funeral services",
      label: "Cross-border funeral services",
    },
    {
      value: "document preparation and notorization",
      label: "Document preparation and notorization",
    },
    {
      value: "personalized funeral services",
      label: "Personalized funeral services",
    },
    {
      value: "legal and administrative assistance",
      label: "Legal and administrative assistance",
    },
    { value: "memorial services", label: "Memorial services" },
    {
      value: "funeral program design and printing",
      label: "Funeral program design and printing",
    },
    {
      value: "body preparation and embalming",
      label: "Body preparation and embalming",
    },
    {
      value: "viewing and visitation arrangements",
      label: "Viewing and visitation arrangements",
    },
    { value: "transportation services", label: "Transportation services" },
  ],
};
const statusSelect = {
  selectTitle: "Status",
  options: [
    { value: "", label: "Select status" }, // Default placeholder
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "not_approved", label: "Not Approved" },
  ],
};
const postalSelect = {
  selectTitle: "Postal Type",
  options: [
    { value: "", label: "Select postal type" }, // Default placeholder
    { value: "business", label: "Business" },
    { value: "Physical ", label: "Physical " },
  ],
};
const twentyFourHourServiceSelect = {
  selectTitle: "Offer 24 hour service",
  options: [
    { value: "", label: "Select service" }, // Default placeholder
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};
const insolventDirectorsSelect = {
  selectTitle: "Any Insolvent Directors",
  options: [
    { value: "", label: "Select service" }, // Default placeholder
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};
const anyCasesSelect = {
  selectTitle: "Any Cases ",
  options: [
    { value: "", label: "Select service" }, // Default placeholder
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};
const extraServicesSelect = {
  selectTitle: "Extra Services",
  options: [
    { value: "", label: "Select additional service(s)" }, // Default placeholder
    { value: "draping", label: "Draping" },
    { value: "mobile toilets", label: "Mobile toilets" },
    { value: "grocery benefit", label: "Grocery benefit" },
    { value: "mobile fridge", label: "Mobile fridge" },
    { value: "sound system", label: "Sound system" },
    { value: "video streaming", label: "video streaming" },
    { value: "airtime allowance", label: "airtime allowance" },
    { value: "tombstone", label: "tombstone" },
    { value: "grief counselling", label: "Grief counselling" },
    {
      value: "floral arrangements (flowers & wrath)",
      label: "Floral arrangements (flowers & wrath)",
    },
    { value: "urns", label: "Urns" },
    {
      value: "funeral programs and stationary",
      label: "Funeral programs and stationary",
    },
    { value: "drave digging", label: "grave digging" },
    { value: "other", label: "Other" },
  ],
};
const raceSelect = {
  selectTitle: "Race",
  options: [
    { value: "", label: "Select race" }, // Default placeholder
    { value: "african", label: "African" },
    { value: "colored", label: "Colored" },
    { value: "Indian", label: "Indian" },
    { value: "white", label: "White" },
    { value: "other", label: "Other" },
  ],
};
const facilityAndEquipmentInfoSelect = {
  selectTitle: "Facility And Equipment Info ",
  options: [
    { value: "", label: "Select race" }, // Default placeholder
    { value: "hearses", label: "hearses" },
    { value: "embalming equipment", label: "Embalming equipment" },
    { value: "cremation equipment", label: "Cremation equipment" },
    { value: "coffin/casket stock", label: "Coffin/casket stock" },
    { value: "grave digging equipment", label: "Grave digging equipment" },
    {
      value: "preparation room equipment",
      label: "Preparation room equipment",
    },
    {
      value: "grief counselling resources",
      label: "Grief counselling resources",
    },
    { value: "cremation viewing room", label: "Cremation viewing room" },
  ],
};

const documentItems = [
  {
    itemLabel: "CIPC Business Registration",
    id: "1",
  },
  {
    itemLabel: "Operating License Certificate",
    id: "2",
  },
  {
    itemLabel: "Insurance Certificate",
    id: "3",
  },
  {
    itemLabel: "Tax Clearance Certificate",
    id: "4",
  },
  {
    itemLabel: "Accreditation Certificates",
    id: "5",
  },
  {
    itemLabel: "Health and Safety Certificate",
    id: "6",
  },
  {
    itemLabel: "Environmental Compliance Certificate",
    id: "7",
  },
  {
    itemLabel: "BEE Certificate",
    id: "8",
  },
  {
    itemLabel: "Company Logo",
    id: "9",
  },
  {
    itemLabel: "Photographs of facilities",
    id: "10",
  },
];

const AddEditForm = (props: Props) => {
  const {
    formTitle,
    formSubtitle,
    submitButtonLabel,
    onSubmit,
    onEdit,
    onCancel,
    onDelete,
    action,
  } = props;

  const { parlourInfo, parlourIndex } = useSelector(
    (state: RootState) => state.parlourInfo
  );

  const route = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<UserInfoState>({
    mode: "all",
    defaultValues: parlourInfo,
  });

  //   // Set default values for select fields when parlourInfo is available (for editing)
  //   if (parlourInfo) {
  //     setValue(
  //       "provinces",
  //       provinceSelect.options.filter((option) =>
  //         parlourInfo.provinces.includes(option.value)
  //       )
  //     ); // Multi-select
  //     setValue(
  //       "listOfServices",
  //       servicesSelect.options.filter((option) =>
  //         parlourInfo.listOfServices.includes(option.value)
  //       )
  //     ); // Multi-select
  //     setValue(
  //       "status",
  //       statusSelect.options.find(
  //         (option) => option.value === parlourInfo.status
  //       )
  //     ); // Single-select
  //     setValue(
  //       "socialMediaHandle",
  //       socialMediaSelect.options.filter((option) =>
  //         parlourInfo.socialMediaHandle.includes(option.value)
  //       )
  //     );
  //     setValue(
  //       "additionalServices",
  //       additionalServicesSelect.options.filter((option) =>
  //         parlourInfo.additionalServices.includes(option.value)
  //       )
  //     );
  //   }
  // }, [parlourInfo, setValue]);

  const onSave = (formData: UserInfoState) => {
    console.log(formData);

    if (onSubmit) {
      onSubmit(formData);
    }
    if (onEdit) {
      onEdit({
        data: formData,
        index: parlourIndex,
      });
    }
  };

  const onEditParlour = () => {
    route.push("/edit-parlour");
  };

  const onDeleteParlour = (index: number) => {
    dispatch(deleteParlour(index));

    route.push("/manage-parlours");
  };

  const onChange = (
    file: { filePath: string; fileName: string },
    index: number
  ) => {
    const doc = documentItems[index];

    // find existing docs, thhen push new one
    let docs = getValues("documents");
    const fileObj = { label: file.fileName, path: file.filePath, id: doc.id };

    if (docs) {
      docs.push(fileObj);
    } else {
      docs = [fileObj];
    }

    setValue("documents", docs);
  };

  return (
    <div className="manage-form-container">
      <BlueCircles className="elipse1" />
      <form onSubmit={handleSubmit(onSave)}>
        <div className="form-title">{formTitle}</div>
        <div className="form-subtitle">{formSubtitle}</div>
        <div className="fields-container">
          <div className="legal-section-title">Business Information</div>
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Funeral Parlour Name"
            defaultValue={parlourInfo?.parlourName}
            {...register("parlourName", {
              required: "Parlour name is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Trading As"
            defaultValue={parlourInfo?.tradingAs}
            {...register("tradingAs", {
              required: "Trade Name is required",
            })}
            errors={errors}
          />

          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Business Registration Number"
            defaultValue={parlourInfo?.businessRegistrationNumber}
            {...register("businessRegistrationNumber", {
              required: "Business registration number is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Business License Number"
            defaultValue={parlourInfo?.businessLicenseNumber}
            {...register("businessLicenseNumber", {
              required: "Business License Number is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Tax Identification Number"
            defaultValue={parlourInfo?.taxIdentificationNumber}
            {...register("taxIdentificationNumber", {
              required: "Tax Identification Number is required",
            })}
            errors={errors}
          />
          <InputField
            type="date"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Registration Date"
            defaultValue={parlourInfo?.registrationDate}
            showText={action === "viewing"}
            {...register("registrationDate", {
              required: "Registration date is required",
            })}
            errors={errors}
          />

          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Website"
            defaultValue={parlourInfo?.websiteDetails}
            {...register("websiteDetails", {
              required: "Website details is required",
            })}
            errors={errors}
          />
          <Select
            showText={action === "viewing"}
            title={postalSelect.selectTitle}
            options={postalSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.postalType}
            {...register("postalType", {
              required: "Postal types is required",
            })}
            isMulti
            errors={errors}
            control={control} // react-hook-form controller
          />

          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Business Address"
            defaultValue={parlourInfo?.businessAddress}
            showText={action === "viewing"}
            {...register("businessAddress", {
              required: "Business Address is required",
            })}
            errors={errors}
          />
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="City"
            defaultValue={parlourInfo?.city}
            showText={action === "viewing"}
            {...register("city", {
              required: "City is required",
            })}
            errors={errors}
          />
          <Select
            showText={action === "viewing"}
            title={provinceSelect.selectTitle}
            options={provinceSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.provinces}
            {...register("provinces", {
              required: "Province date is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Postal Code"
            defaultValue={parlourInfo?.postalCode}
            showText={action === "viewing"}
            {...register("postalCode", {
              required: "Postal Code is required",
            })}
            errors={errors}
          />
          <div className="legal-section-title">
            Parlours Company Information
          </div>
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Physical Address"
            defaultValue={parlourInfo?.physicalAddress}
            showText={action === "viewing"}
            {...register("physicalAddress", {
              required: "Physical Address is required",
            })}
            errors={errors}
          />
          <Select
            showText={action === "viewing"}
            title={twentyFourHourServiceSelect.selectTitle}
            options={twentyFourHourServiceSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.twentyFourHourService}
            {...register("twentyFourHourService", {
              required: "Service is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />
          <Select
            showText={action === "viewing"}
            title={insolventDirectorsSelect.selectTitle}
            options={insolventDirectorsSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.insolventDirectors}
            {...register("insolventDirectors", {
              required: "Insolvent Directors is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />
          <Select
            showText={action === "viewing"}
            title={anyCasesSelect.selectTitle}
            options={anyCasesSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.anyCases}
            {...register("anyCases", {
              required: "Case field  is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />
          <Select
            showText={action === "viewing"}
            title={provinceSelect.selectTitle}
            options={provinceSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.provinces}
            {...register("provinces", {
              required: "Province date is required",
            })}
            isMulti
            errors={errors}
            control={control} // react-hook-form controller
          />

          <div className="legal-section-title">
            Funeral Parlour Owner Details
          </div>

          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Title"
            defaultValue={parlourInfo?.title}
            {...register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Initials"
            defaultValue={parlourInfo?.initials}
            {...register("initials", {
              required: "Intials is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Owner's Name"
            defaultValue={parlourInfo?.ownerName}
            {...register("ownerName", {
              required: "Owner's name is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Owner's Surname"
            defaultValue={parlourInfo?.ownerSurname}
            {...register("ownerSurname", {
              required: "Owner's Surname is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Owner's Number"
            defaultValue={parlourInfo?.ownerNumber}
            {...register("ownerNumber", {
              required: "Owner's number is required",
              maxLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              pattern: {
                value: /^0[0-9]{9}$/,
                message: "Phone Number must start with 0 and be 10 digits long",
              },
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Alt Number"
            defaultValue={parlourInfo?.altNumber}
            {...register("altNumber", {
              required: "Alt Number is required",
              maxLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              pattern: {
                value: /^0[0-9]{9}$/,
                message: "Phone Number must start with 0 and be 10 digits long",
              },
            })}
            errors={errors}
          />
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Email Address"
            defaultValue={parlourInfo?.emailingAddress}
            showText={action === "viewing"}
            {...register("emailingAddress", {
              required: "Email Address is required",
            })}
            errors={errors}
          />
          <Select
            showText={action === "viewing"}
            title={raceSelect.selectTitle}
            options={raceSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.race}
            {...register("race", {
              required: "Race is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />

          <div className="legal-section-title">
            Funeral Parlour Manager Details
          </div>
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Title"
            defaultValue={parlourInfo?.title}
            {...register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Initials"
            defaultValue={parlourInfo?.initials}
            {...register("initials", {
              required: "Intials required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Manager's Name"
            defaultValue={parlourInfo?.managerName}
            {...register("managerName", {
              required: "Manger's name is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Manager's Surname"
            defaultValue={parlourInfo?.managerSurname}
            {...register("managerSurname", {
              required: "Manager's surname is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Manager's Contact"
            defaultValue={parlourInfo?.managerContact}
            {...register("managerContact", {
              required: "Manager's contact is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Alt Number"
            defaultValue={parlourInfo?.altNumber}
            {...register("altNumber", {
              required: "Alt Number is required",
              maxLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              pattern: {
                value: /^0[0-9]{9}$/,
                message: "Phone Number must start with 0 and be 10 digits long",
              },
            })}
            errors={errors}
          />
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Email Address"
            defaultValue={parlourInfo?.emailingAddress}
            showText={action === "viewing"}
            {...register("emailingAddress", {
              required: "Email Address is required",
            })}
            errors={errors}
          />
          <Select
            showText={action === "viewing"}
            title={raceSelect.selectTitle}
            options={raceSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.race}
            {...register("race", {
              required: "Race is required",
            })}
            errors={errors}
            control={control} // react-hook-form controller
          />

          <div className="legal-section-title">
            Funeral Parlour General Information
          </div>
          <InputField
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Email Address"
            defaultValue={parlourInfo?.emailingAddress}
            showText={action === "viewing"}
            {...register("emailingAddress", {
              required: "Email Address is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Landline"
            defaultValue={parlourInfo?.managerContact}
            {...register("landline", {
              required: "Landline is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Number of Branches"
            defaultValue={parlourInfo?.numberOfBranches}
            {...register("numberOfBranches", {
              required: "Number of Branches is required",
            })}
            errors={errors}
          />
          <InputField
            showText={action === "viewing"}
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="Alt Number"
            defaultValue={parlourInfo?.altNumber}
            {...register("altNumber", {
              required: "Alt Number is required",
              maxLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone Number must be 10 digits",
              },
              pattern: {
                value: /^0[0-9]{9}$/,
                message: "Phone Number must start with 0 and be 10 digits long",
              },
            })}
            errors={errors}
          />
          <div className="legal-section-title">Social Media Handles</div>
          <div className="socials">
            <InputField
              showText={action === "viewing"}
              type="text"
              className={`parlour-field ${
                action === "viewing" ? "no-star" : ""
              }`}
              label="Linkedin"
              defaultValue={parlourInfo?.socialMediaHandle.linkedin}
              {...register("socialMediaHandle.instagram", {
                required: "Instagram details is required",
              })}
              errors={errors}
            />
            <InputField
              showText={action === "viewing"}
              type="text"
              className={`parlour-field ${
                action === "viewing" ? "no-star" : ""
              }`}
              label="Tiktok"
              defaultValue={parlourInfo?.socialMediaHandle.tiktok}
              {...register("socialMediaHandle.tiktok", {
                required: "Tiktok details is required",
              })}
              errors={errors}
            />
            <InputField
              showText={action === "viewing"}
              type="text"
              className={`parlour-field ${
                action === "viewing" ? "no-star" : ""
              }`}
              label="Instagram"
              defaultValue={parlourInfo?.socialMediaHandle.instagram}
              {...register("socialMediaHandle.instagram", {
                required: "Instagram details is required",
              })}
              errors={errors}
            />
            <InputField
              showText={action === "viewing"}
              type="text"
              className={`parlour-field ${
                action === "viewing" ? "no-star" : ""
              }`}
              label="facebook"
              defaultValue={parlourInfo?.socialMediaHandle.facebook}
              {...register("socialMediaHandle.tiktok", {
                required: "Facebook details is required",
              })}
              errors={errors}
            />

            <InputField
              showText={action === "viewing"}
              type="text"
              className={`parlour-field ${
                action === "viewing" ? "no-star" : ""
              }`}
              label="Twitter"
              defaultValue={parlourInfo?.socialMediaHandle.facebook}
              {...register("socialMediaHandle.twitter", {
                required: "Twitter details is required",
              })}
              errors={errors}
            />
          </div>

          <div className="legal-section-title ">Service Offering</div>
          <Select
            showText={action === "viewing"}
            title={mainServicesSelect.selectTitle}
            options={mainServicesSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.mainServices}
            {...register("mainServices", {
              required: "Main Services is required",
            })}
            isMulti
            errors={errors}
            control={control}
          />

          <Select
            showText={action === "viewing"}
            title={extraServicesSelect.selectTitle}
            options={extraServicesSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.extraServices}
            {...register("extraServices", {
              required: "Extra services is required",
            })}
            isMulti
            errors={errors}
            control={control}
          />
          <InputField
            showText={action === "viewing"}
            name="other"
            type="text"
            className={`parlour-field ${action === "viewing" ? "no-star" : ""}`}
            label="If other, please indicate"
            // defaultValue={parlou}
          />

          <Select
            showText={action === "viewing"}
            title={facilityAndEquipmentInfoSelect.selectTitle}
            options={facilityAndEquipmentInfoSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.facilityAndEquipmentInfo}
            {...register("facilityAndEquipmentInfo", {
              required: "Facility And Equipment Info  is required",
            })}
            isMulti
            errors={errors}
            control={control}
          />

          <div className="legal-section-title">Documentation Uploads</div>

          {action !== "viewing" && parlourInfo && (
            <>
              {documentItems.map((item, index) => {
                const docName = parlourInfo.documents.find((value) => {
                  return value.id == item.id;
                });
                return (
                  <div key={index} className="doc-upload-cont">
                    <div className="doc-label">{item.itemLabel}</div>
                    <div className="doc-uploading">
                      <UploadInput
                        id={item.id}
                        name={item.itemLabel}
                        handleChange={(file) => onChange(file, index)}
                        fileName={docName?.label}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {action == "viewing" && parlourInfo && (
            <>
              {documentItems.map((item, index) => {
                const docName = parlourInfo.documents.find((value) => {
                  return value.id == item.id;
                });
                return (
                  <div key={index} className="doc-upload-cont">
                    <div className="doc-label">{item.itemLabel}</div>
                    <div className="doc-uploading">
                      {docName ? (
                        <>
                          {docName.label}
                          <a
                            href={`/${docName.path}`}
                            download={docName.label}
                            className="download-icon"
                          >
                            <FaDownload />
                          </a>
                        </>
                      ) : (
                        "Not provided"
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div className="legal-section-title">Application Status</div>
          <Select
            showText={action === "viewing"}
            title={statusSelect.selectTitle}
            options={statusSelect.options}
            className={`parlour-field select-style ${
              action === "viewing" ? "no-star" : ""
            }`}
            defaultValue={parlourInfo?.status || statusSelect.options[1]}
            {...register("status", {
              required: "Status is required",
            })}
            errors={errors}
            control={control}
          />

          <div className="form-buttons">
            {action === "viewing" && (
              <>
                <Button
                  color="primary"
                  onClick={() => onDeleteParlour(parlourIndex)}
                >
                  Delete
                </Button>
                <Button onClick={onEditParlour} color="primary">
                  Edit
                </Button>
              </>
            )}

            {action !== "viewing" && (
              <>
                <Link href="/manage-parlours" passHref>
                  Cancel
                </Link>
                <Button color="primary" type="submit">
                  {submitButtonLabel}
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
      <BlueCircles className="elipse2" />
      <BlueCircles className="elipse3" />
    </div>
  );
};

export default AddEditForm;
