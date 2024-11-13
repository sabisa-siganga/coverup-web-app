import React from "react";
import "./parlour-stats.scss";
import StatsCard from "@/components/StatsCard/StatsCard";
import Image from "next/image";
import BlueCircles from "@/components/BlueCircles/BlueCircles";
const data = [
  {
    cardTitle: "Total Searches",
    figure: "9786",
    percentage: "+ 13% since last week",
  },
  {
    cardTitle: "New Searches",
    figure: "9786",
    percentage: "+ 5% since last week",
  },
  {
    cardTitle: "Total registered funeral parlours",
    figure: "7353",
    percentage: "+ 20% since last week",
  },

  {
    cardTitle: "New registered parlours",
    figure: "1665",
    percentage: "+ 9% since last week",
  },
];

const ParlourStatistics = () => {
  return (
    <>
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
      <div className="stats-cont">
        <div className="parlour-stats-container">
          <div className="stat-cards-cont">
            {data.map((item, index) => {
              return (
                <StatsCard
                  key={index}
                  cardTitle={item.cardTitle}
                  figure={item.figure}
                  percentage={item.percentage}
                />
              );
            })}
          </div>
          <div className="text-image-container">
            <div className="text-cont">
              <div className="heading">Welcome Back Admin!</div>
              <div className="sub-heading">View the lastest stats</div>
            </div>
            <BlueCircles className="admin-circle1" />
            <div className="turtle-container">
              <Image
                src="/admin-portal/turtle-computer.svg"
                width={400}
                height={300}
                alt="turtle"
              />
            </div>
            <BlueCircles className="admin-circle2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParlourStatistics;
