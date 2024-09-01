import React from "react";
import "./CardPolicy.scss";

interface Props {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
}
const CardPolicy = (props: Props) => {
  const { className, children, onClick } = props;
  return (
    <button
      type="button"
      className={`policy-container ${className}`}
      onClick={onClick}
    >
      <div>{children}</div>
    </button>
  );
};

export default CardPolicy;
