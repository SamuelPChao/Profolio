import React, { useState } from "react";
import profolio_protrait from "../assets/img/portrait.jpg";
import resumeInfoData from "../data/resumeInfo";
import {
  type ResumeInfo,
  type WorkExperience,
  type DevelopmentSkill,
} from "../data/resumeInfo";
import { Education } from "../data/resumeInfo";
import reactLogo from "../assets/img/react.svg";
import typescriptLogo from "../assets/img/typescript.svg";
import javascriptLogo from "../assets/img/javascript.svg";
import aspnetLogo from "../assets/img/aspnet.svg";
import sqlLogo from "../assets/img/sql.svg";
import SectionTitle from "../components/SectionTitle";

const skillLogos = {
  react: reactLogo,
  typescript: typescriptLogo,
  javascript: javascriptLogo,
  aspnet: aspnetLogo,
  sql: sqlLogo,
};

const ResumePage: React.FC = () => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo>(resumeInfoData);
  return (
    <div className="w-full flex flex-wrap gap-y-5">
      <>
        <SectionTitle title="個人資訊" />
        <div className="w-full h-fit grid grid-cols-[3fr,5fr] bg-black-1 rounded py-[1rem] px-[1rem]">
          <div className="w-full flex flex-wrap h-fit gap-y-2.5">
            <div className="w-full h-fit">
              <img
                src={profolio_protrait}
                alt="大頭照"
                className="h-[10rem] rounded"
              />
            </div>
            <h1 className="text-[1.5rem] tracking-[1.5rem]">
              {resumeInfo.lastName}
              {resumeInfo.firstName}
            </h1>
            <div className="w-full flex flex-wrap gap-y-0.5">
              <p className="w-full">{resumeInfo.dateOfBirth}</p>
              <p className="w-full">{resumeInfo.phoneNumber}</p>
              <p className="w-full">{resumeInfo.email}</p>
            </div>
            <div className="w-full flex flex-wrap gap-y-0.5">
              {resumeInfo.education.map(
                (education: Education, index: number) => (
                  <p key={index} className="w-full">
                    {education.school}
                  </p>
                )
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-y-5 rounded-xl px-5 py-2.5 h-fit">
            {resumeInfo.personalStatement.map(
              (statement: string, index: number) => {
                return (
                  <p key={index} className="w-full indent-5 tracking-widest">
                    {statement}
                  </p>
                );
              }
            )}
          </div>
        </div>
      </>
      <>
        <SectionTitle title="工作經驗" />
        <div className="w-full bg-black-1 rounded py-[1rem] px-[1rem]">
          {resumeInfo.workExperience.map(
            (experience: WorkExperience, index: number) => (
              <div
                key={index}
                className="w-full grid grid-cols-[2fr,4fr,4fr,3fr]"
              >
                <span className="tracking-[0.25rem]">
                  {experience.location}
                </span>
                <span className="tracking-[0.25rem]">{experience.company}</span>
                <span className="tracking-[0.25rem]">
                  {experience.position}
                </span>
                <span className="tracking-[0.25rem]">{experience.date}</span>
              </div>
            )
          )}
        </div>
      </>
      <>
        <SectionTitle title="開發技能" />

        <div className="w-full flex flex-wrap gap-y-5">
          <div className="w-full grid grid-cols-2 gap-x-5">
            <div className="w-full flex flex-wrap gap-y-5 bg-black-1 rounded py-[1rem] px-[1rem]">
              <h3 className="w-fit border-b border-solid py-[0.25rem]">前端</h3>
              {resumeInfo.developmentSkills.frontEnd.map(
                (skill: DevelopmentSkill, index: number) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-[1fr,2fr,2fr] items-center gap-x-5"
                  >
                    <div className="w-full">
                      <img
                        src={skillLogos[skill.icon]}
                        alt={skill.name}
                        className="w-[2.5rem] h-[2.5rem]"
                      />
                    </div>
                    <span className="tracking-widest word-spacing-xl">
                      {skill.name}
                    </span>
                    <span>{skill.level}</span>
                  </div>
                )
              )}
            </div>
            <div className="w-full h-fit flex flex-wrap gap-y-5 bg-black-1 rounded py-[1rem] px-[1rem]">
              <h3 className="w-fit border-b border-solid py-[0.25rem]">後端</h3>
              {resumeInfo.developmentSkills.backEnd.map(
                (skill: DevelopmentSkill, index: number) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-[1fr,2fr,2fr] items-center gap-x-5"
                  >
                    <div className="w-full">
                      <img
                        src={skillLogos[skill.icon]}
                        alt={skill.name}
                        className="w-[2.5rem] h-[2.5rem]"
                      />
                    </div>
                    <span className="tracking-widest word-spacing-xl">
                      {skill.name}
                    </span>
                    <span>{skill.level}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default ResumePage;
