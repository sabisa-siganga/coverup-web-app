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

interface PolicyDetails {
  name: string;
  image: string;
  monthlyPay: string;
  claim: string;
  option: string;
  description: string;
  benefits: string;
}

const CoverOptionsPage = () => {
  const router = useRouter();
  const paymentRange = useSelector(
    (state: RootState) => state.userData.info.payment
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [coverOption, setCoverOption] = useState<string>("");
  const [filteredPolicies, setFilteredPolicies] = useState<PolicyDetails[]>([]);
  const [policyList, setPolicyList] = useState<PolicyDetails[]>([]);

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
    setPolicyList(filtered);
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

  return (
    <div className="cover-container">
      <ProgressBar currentStep={5} className="cover-step-no" />

      <div className="options-filter-container">
        <div className="cover-bg-cont">
          <Image
            src="/cover-options/cover-bg-img.jpg"
            width={900}
            height={50}
            alt="cover-bg"
            className="cover-bg"
          />
        </div>

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
            <p className="no-match">Oops! No matching policies</p>
          ) : (
            filteredPolicies.map((item, index) => {
              return (
                <CardPolicy
                  key={index}
                  className="card"
                  // monthlyPay={item.monthlyPay}
                  // claim={item.claim}
                  option={item.option}
                  image={item.image}
                  description={item.description}
                  benefits={item.benefits}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverOptionsPage;
