import { SelectOption } from "@/components/Select/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for the parlour information
export interface UserInfoState {
  id?: number;
  parlourName: string;
  tradingAs: string;
  businessRegistrationNumber: string;
  businessLicenseNumber: string;
  taxIdentificationNumber: string;
  postalType: SelectOption[];
  businessAddress: string;
  city: string;
  provinces: SelectOption[];
  postalCode: string;
  physicalAddress: string;
  twentyFourHourService: SelectOption;
  insolventDirectors: SelectOption;
  anyCases: SelectOption;
  title: string;
  initials: string;
  gender: string;
  ownerName: string;
  ownerSurname: string;
  ownerNumber: string;
  altNumber: string;
  emailingAddress: string;
  race: SelectOption;
  managerName: string;
  managerSurname: string;
  managerContact: string;
  landline: string;
  numberOfBranches: string;
  socialMediaHandle: {
    linkedin: string;
    tiktok: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  mainServices: SelectOption[];
  extraServices: SelectOption[];
  facilityAndEquipmentInfo: SelectOption[];
  documents: {
    label: string;
    path: string;
    id: string;
  }[];
  registrationDate: string;
  status: SelectOption;
  websiteDetails: string;
}

// Interface for Parlour Info with index and data
export interface ParlourInfo {
  index: number;
  data: UserInfoState;
}

// Dummy data for initial parlour list
const parlours: UserInfoState[] = [
  {
    id: 1,
    parlourName: "Dove Funerals",
    tradingAs: "Dove Funerals",
    businessRegistrationNumber: "456799",
    businessLicenseNumber: "456799",
    taxIdentificationNumber: "456799",
    postalType: [
      { label: "Business", value: "business" },
      { label: "Physical", value: "physical" },
    ],
    businessAddress: "89 Sundowns, Midrand",
    city: "Johannesburg",
    provinces: [{ label: "Western Cape", value: "western Cape" }],
    postalCode: "5090",
    physicalAddress: "89 Sundowns, Midrand",
    twentyFourHourService: { label: "No", value: "no" },
    insolventDirectors: { label: "No", value: "no" },
    anyCases: { label: "No", value: "no" },
    title: "Miss",
    initials: "S",
    gender: "Female",
    ownerName: "Lucy",
    ownerSurname: "Doe",
    ownerNumber: "+27 82 345 6789",
    altNumber: "+27 82 345 6789",
    emailingAddress: "info@heavensgate.co.za",
    race: { label: "Black", value: "black" },
    managerName: "Jane ",
    managerSurname: "Smith",
    managerContact: "+27 83 456 7890",
    landline: "+27 82 345 6789",
    numberOfBranches: "1",
    socialMediaHandle: {
      linkedin: "heavensgate",
      facebook: "heavensgate",
      instagram: "@heavensgate_com",
      tiktok: "",
      twitter: "",
    },
    mainServices: [
      { label: "Burial", value: "burial" },
      { label: "Cremation", value: "cremation" },
      { label: "Memorial Services", value: "Memorial Services" },
    ],
    extraServices: [
      { label: "Catering", value: "catering" },
      { label: "Transportation", value: "Transportation" },
      { label: "Floral Arrangements", value: "Floral Arrangements" },
    ],
    facilityAndEquipmentInfo: [{ label: "", value: "" }],
    documents: [],
    status: { label: "Pending", value: "pending" },
    websiteDetails: "https://www.heavensgatefunerals.co.za",
    registrationDate: "2024-01-15",
  },
];

// Initial state
const initialState: {
  parlourInfo?: UserInfoState;
  parlours: UserInfoState[];
  parlourIndex: number;
} = {
  parlourInfo: undefined,
  parlours: parlours,
  parlourIndex: 0,
};

const parlourInfoSlice = createSlice({
  name: "parlourInfo",
  initialState,
  reducers: {
    // Saves a parlour to view
    saveParlourForView(state, action: PayloadAction<ParlourInfo>) {
      state.parlourInfo = action.payload.data;
      state.parlourIndex = action.payload.index;
    },

    // Clears the parlour being viewed
    clearParlourForView(state) {
      state.parlourInfo = undefined;
      state.parlourIndex = 0;
    },

    // Adds a new parlour
    addParlour(state, action: PayloadAction<UserInfoState>) {
      if (state.parlours) {
        state.parlours.push(action.payload);
      } else {
        state.parlours = [action.payload];
      }
    },

    // Edits an existing parlour by index
    editParlour(state, action: PayloadAction<ParlourInfo>) {
      state.parlours[action.payload.index] = action.payload.data;
    },
    deleteParlour(state, action: PayloadAction<number>) {
      state.parlours.splice(action.payload, 1);
    },
  },
});

export const {
  saveParlourForView,
  clearParlourForView,
  addParlour,
  editParlour,
  deleteParlour,
} = parlourInfoSlice.actions;
export default parlourInfoSlice.reducer;
