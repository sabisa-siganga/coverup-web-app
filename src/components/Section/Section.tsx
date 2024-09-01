import React from "react";
import "./Section.scss";

interface SectionProps {
  title: string;
  description: React.ReactNode;
}

const Section = (props: SectionProps) => {
  const { title, description } = props;
  return (
    <>
      <div className="about-title">{title}</div>
      <div className="about-description">{description}</div>
    </>
  );
};

export default Section;
