import React from "react";
import "./UserDashboard.scss";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="welcome-message">
        Welcome, <span>Andile</span>
      </div>
      <div className="welcome-sub-message">Have a nice day!</div>
      <div className="user-card-container">
        <div>Family Cover</div>
      </div>
    </div>
  );
};

export default UserDashboard;
