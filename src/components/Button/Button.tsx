import React from "react";
import "./Button.scss";
import { FiLoader } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary";
  loading?: boolean;
}

const Button = (props: Props) => {
  const { color, onClick, type = "button", children, loading } = props;

  return (
    <button
      type={type || "button"}
      className={`btn btn-${color}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="loader-icon-container">
          <FiLoader className="loader-icon" />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
