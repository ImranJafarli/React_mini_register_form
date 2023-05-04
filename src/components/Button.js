import React from "react";

const Button = ({ title, onClick, className, disabled }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
