import React from "react";
import { type DevelopmentSkill } from "../data/resumeInfo";
interface SkillTableProps {
  skillList: DevelopmentSkill[];
  skillLogos: { [key: string]: string };
}

const SkillTable: React.FC<SkillTableProps> = ({ skillList, skillLogos }) => {
  return (
    <>
      {skillList.map((skill: DevelopmentSkill, index: number) => (
        <div
          key={index}
          className="w-full grid grid-cols-[1fr,2fr,2fr] items-center gap-x-5"
        >
          <div className="w-full">
            <img
              src={skillLogos[skill.icon as keyof typeof skillLogos]}
              alt={skill.name}
              className="w-[2.5rem] h-[2.5rem]"
            />
          </div>
          <span className="tracking-widest word-spacing-xl">{skill.name}</span>
          <span>{skill.level}</span>
        </div>
      ))}
    </>
  );
};

export default SkillTable;
