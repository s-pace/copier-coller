import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  disabled,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
      className={clsx(
        "hover:bg-hover-button focus:ring-hover-button cursor-pointer rounded border-none bg-secondary px-5 py-3 text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        { "cursor-not-allowed opacity-50": disabled },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
