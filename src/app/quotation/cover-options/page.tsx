"use client";

import ContainerWrapper from "@/components/ContainerWrapper/ContainerWrapper";
import React, { useEffect, useState } from "react";
import "./CoverOptions.scss";
import CardPolicy from "@/components/CardPolicy/CardPolicy";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import InputField from "@/components/InputField/InputField";
import { FaSearch } from "react-icons/fa";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import axios from "axios";

const policyList = [
  {
    name: "Old Mutual",
    image: "/policies/oldmutual.png",
    monthlyPay: "R100 - R199",
    claim: "R5 000 per claim",
    option: "Basic Cover",
    color: "green",
  },
  {
    name: "Clientel",
    image: "/policies/clientele.png",
    monthlyPay: "R200 - R299",
    claim: "R10 000 per claim",
    option: "Standard Cover",
    color: "blue",
  },
  {
    name: "Avbob",
    image: "/policies/avbob.png",
    monthlyPay: "R300 - R399",
    claim: "R15 000 per claim",
    option: "Family Cover",
    color: "lime",
  },
  {
    name: "Assupol",
    image: "/policies/assupol.png",
    monthlyPay: "R400+",
    claim: "R20 000 per claim",
    option: "Premium Cover",
    color: "red",
  },
];

const CoverOptionsPage = () => {
  const router = useRouter();
  const paymentRange = useSelector(
    (state: RootState) => state.userData.info.payment
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [coverOption, setCoverOption] = useState<string>("");
  const [filteredPolicies, setFilteredPolicies] = useState(policyList);

  // Fetch policies based on payment range, search term, and cover option
  const fetchPolicies = async (range: string, term: string, option: string) => {
    try {
      // Remove "R" from range and use "-" as the separator
      const sanitizedRange = range.replace(/[R\s]/g, "");

      const response = await axios.get("/api/get-covers", {
        params: {
          paymentRange: sanitizedRange,
          searchTerm: term,
          coverOption: option,
        },
      });
      setFilteredPolicies(response.data.policies);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // Fetch policies when payment range changes
  useEffect(() => {
    if (paymentRange) {
      fetchPolicies(paymentRange, "", "");
    }
  }, [paymentRange]);

  // Filter policies based on search term and cover option
  const filterPolicies = (term: string, option: string) => {
    const filtered = policyList.filter(
      (policy) =>
        policy.name.toLowerCase().includes(term.toLowerCase()) &&
        (option ? policy.option.toLowerCase() === option.toLowerCase() : true)
    );
    setFilteredPolicies(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // accessing the input value
    const value = event.target.value;

    // updating the state
    setSearchTerm(value);

    // filtering the policies
    filterPolicies(value, coverOption);
  };

  // Handle cover option selection change
  const handleCoverOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCoverOption(value);
    filterPolicies(searchTerm, value);
  };

  // Execute search by fetching policies from the api
  const executeSearch = () => {
    fetchPolicies(paymentRange, searchTerm, coverOption);
  };

  // Navigate to policy details page
  const selectPolicy = () => {
    router.push("/quotation/policy-details");
  };

  return (
    <div className="cover-container">
      <ContainerWrapper className="cover-header-container">
        <div className="cover-title">Cover Options</div>
        <p>Here are cover options that work best for you</p>
      </ContainerWrapper>

      <ProgressBar currentStep={5} className="cover-step-no" />

      <div className="options-filter-container">
        <div className="search-container">
          <InputField
            name="search"
            type="text"
            placeholder="Search by cover name"
            className="search-input-field"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="secondary" onClick={executeSearch}>
            <FaSearch className="search-icon " />
          </Button>
        </div>

        <div className="policy-cards-container">
          {filteredPolicies.length === 0 ? (
            <p className="no-match">No matching policies</p>
          ) : (
            filteredPolicies.map((item, index) => {
              return (
                <CardPolicy
                  key={index}
                  className={item.color}
                  onClick={selectPolicy}
                >
                  <div className="single-card grid grid-cols-2 items-center border rounded-lg shadow-md">
                    <div className="flex justify-center">
                      <Image
                        src={item.image}
                        width={50}
                        height={50}
                        alt="policy"
                        className="w-12 h-12"
                      />
                    </div>
                    <div className="list-text flex flex-col text-left">
                      <div>{item.monthlyPay}aaa</div>
                      <div>{item.claim}</div>
                      <div>{item.option}</div>
                    </div>
                  </div>
                </CardPolicy>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverOptionsPage;
