import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import projectExperience from "../data/projectExperience";
import { type Project } from "../data/projectExperience";
import SectionTitle from "../components/SectionTitle";
import PhotoBox from "../components/PhotoBox";
const ProjectDetailPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project>();
  const [searchParams, _] = useSearchParams();
  const index = searchParams.get("index");
  const photoSources: string[] = useMemo(() => {
    return currentProject ? currentProject.imgSources : [];
  }, [currentProject]);
  useEffect(() => {
    if (index) {
      setCurrentProject(projectExperience[parseInt(index)]);
    }
  }, [index]);
  return (
    <div className="w-full flex flex-wrap gap-y-5">
      <>
        {currentProject && (
          <>
            <SectionTitle title={currentProject.title} />
            <div className="w-full flex justify-center">
              <PhotoBox photoSources={photoSources} />
            </div>
            <div className="w-full bg-black-1 rounded py-[1rem] px-[1rem]">
              <p className="indent-10 tracking-widest">
                {currentProject.description}
              </p>
            </div>
            <div className="w-full flex flex-wrap gap-y-[1rem]">
              <SectionTitle title="功能說明" />
              {currentProject.content.map((content, index: number) => (
                <div
                  className="w-full flex flex-wrap gap-y-2.5 bg-black-1 rounded py-[1rem] px-[1rem]"
                  key={index}
                >
                  <h1 className="text-white-1 tracking-widest">
                    {content.title}
                  </h1>
                  <p className="indent-10 tracking-widest text-white-3 px-[1rem]">
                    {content.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default ProjectDetailPage;
