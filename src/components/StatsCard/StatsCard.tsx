import React from "react";
import "./StatsCard.scss";

interface Props {
  cardTitle: string;
  figure: string;
  percentage: string;
}

const StatsCard = (props: Props) => {
  const { cardTitle, figure, percentage } = props;
  return (
    <div className="card-container">
      <div className="card-title">{cardTitle}</div>
      <div className="figure">{figure}</div>
      <div className="percentage-cont">
        <div className="percentage">{percentage}</div>
      </div>
    </div>
  );
};

export default StatsCard;
