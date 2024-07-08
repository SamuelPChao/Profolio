import React from "react";
const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...attributes
}) => {
  return (
    <div
      className={`Container ${className} bg-black-1 rounded py-[1rem] px-[1rem]`}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Container;
