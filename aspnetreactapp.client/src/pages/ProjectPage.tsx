import React from "react";
import projectExperience from "../data/projectExperience";
import { useNavigate } from "react-router-dom";
const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSelectProject = (index: number) => {
    navigate(`/project/project_detail?index=${index}`);
  };
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.classList.remove("hidden");
    img.classList.add("animate-fade-display");
  };
  return (
    <div className="w-full flex flex-wrap gap-y-5">
      <div className="w-full grid grid-cols-3 justify-center gap-x-5">
        {projectExperience.map((project, index: number) => (
          <React.Fragment key={index}>
            <div
              className="w-full h-fit cursor-pointer bg-black-1 rounded py-[1rem] px-[1rem] hover:animate-fade-in-out active:bg-white-1 active:text-[#101010]"
              onClick={() => handleSelectProject(index)}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${project.displayImg}.jpg`}
                  alt="圖片"
                  onLoad={handleImageLoad}
                />
              </div>
              <h1 className="w-full text-center mt-[1rem]">{project.title}</h1>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default ProjectPage;
