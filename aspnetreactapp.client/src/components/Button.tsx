import React, { ComponentPropsWithoutRef } from "react";
interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="cursor-pointer h-[2.5rem] px-4 disabled:opacity-50 border-white-3 border-solid border-1 rounded hover:bg-white-3 hover:text-black-1 active:bg-white-1 active:text-black-1"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
