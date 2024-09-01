import Image from "next/image";
import React from "react";
import "./BlueCircles.scss";

interface Props {
  className: string;
}

const BlueCircles = (props: Props) => {
  const { className } = props;
  return (
    <div className={`elipse-container ${className}`}>
      <Image
        src="/assets/full-elipse.svg"
        width={50}
        height={50}
        alt="full-elipse"
      />
    </div>
  );
};

export default BlueCircles;
