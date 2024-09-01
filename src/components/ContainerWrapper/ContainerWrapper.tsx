import React from "react";
import "./ContainerWrapper.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ContainerWrapper = (props: Props) => {
  return (
    <div className={`container-wrapper ${props.className || ""}`}>
      <div>{props.children}</div>
    </div>
  );
};

export default ContainerWrapper;
