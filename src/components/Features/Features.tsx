import React from "react";
import "./Features.scss";

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-title">
        Save time and money by comparing burial schemes in one place.
      </div>
      <ul className="features">
        <li className="feature-item">Easy and secure login</li>
        <li className="feature-item">Compare burial schemes and prices</li>
        <li className="feature-item">View and sign contracts electronically</li>
        <li className="feature-item">Make amendments and updates with ease</li>
        <li className="feature-item">Store documents securely</li>
      </ul>

      <div className="closing-statement">
        Get the best price, from the best companies, with our help.
      </div>
    </div>
  );
};

export default Features;
