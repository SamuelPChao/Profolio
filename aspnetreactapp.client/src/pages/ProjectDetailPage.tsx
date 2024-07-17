import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import projectExperience from "../data/projectExperience";
import { type Project } from "../data/projectExperience";
import SectionTitle from "../components/SectionTitle";
import PhotoBox from "../components/PhotoBox";
import PopModal from "../components/PopModal";
const ProjectDetailPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project>();
  const [searchParams, _] = useSearchParams();
  const index = searchParams.get("index");
  const [photoBoxModalShow, setPhotoBoxModalShow] = useState<boolean>(false);
  const onCloseModal = () => {
    setPhotoBoxModalShow(false);
  };
  const photoSources: string[] = useMemo(() => {
    return currentProject ? currentProject.imgSources : [];
  }, [currentProject]);
  const handleClickBox = (e: React.MouseEvent<HTMLImageElement>) => {
    const index = parseInt(
      e.currentTarget.getAttribute("data-index") as string
    );
    const reorderedSources = [
      ...photoSources.slice(index),
      ...photoSources.slice(0, index),
    ];
    setCurrentProject((prev) => {
      if (!prev) return prev;
      return { ...prev, imgSources: reorderedSources };
    });
    setPhotoBoxModalShow(true);
  };
  useEffect(() => {
    if (index) {
      setCurrentProject(projectExperience[parseInt(index)]);
    }
  }, [index]);
  return (
    <div className="w-full flex flex-wrap gap-y-5">
      <PopModal show={photoBoxModalShow} handleShow={onCloseModal}>
        <PhotoBox photoSources={photoSources} />
      </PopModal>
      {currentProject && (
        <>
          <SectionTitle title={currentProject.title} />
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[36rem]">
              <PhotoBox photoSources={photoSources} onClick={handleClickBox} />
            </div>
          </div>
          <p className="w-full cursor-pointer indent-10 tracking-widest text-[0.8rem] rounded p-[1rem] bg-black-1 hover:bg-white-3 hover:text-black-1">
            {currentProject.description}
          </p>

          <SectionTitle title="開發內容" />
          <div className="w-full grid grid-cols-2 auto-rows-max gap-[1rem]">
            {currentProject.content.map((content, index: number) => (
              <div
                className="w-full flex flex-wrap flex-col  gap-y-2.5 bg-black-1 rounded py-[1rem] px-[1rem]"
                key={index}
              >
                <h1 className="w-full text-white-1 tracking-widest">
                  {content.title}
                </h1>
                <p className="indent-10 tracking-widest text-white-3 px-[0.5rem] text-[0.8rem]">
                  {content.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailPage;
