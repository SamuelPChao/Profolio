import React from "react";
interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title, ...props }) => {
  return (
    <div className="w-full flex">
      <h1
        className="flex text-white-1 text-[1.25rem] bg-black-1 rounded py-[1rem] px-[1rem]"
        {...props}
      >
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
