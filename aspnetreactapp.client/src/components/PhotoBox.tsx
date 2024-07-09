import React, { useState } from "react";
interface PhotoBoxProps {
  photoSources: string[];
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const PhotoBox: React.FC<PhotoBoxProps> = ({ photoSources }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.classList.remove("hidden");
    img.classList.add("animate-fade-display");
  };
  const handleSetIndex = (count: number) => {
    if (currentIndex + count < 0) {
      return setCurrentIndex(photoSources.length - 1);
    }
    if (currentIndex + count >= photoSources.length) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + count);
  };
  return (
    <div className="relative w-[32rem] h-[18rem]">
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="cursor-pointer h-10 z-[100] absolute left-[-2rem] top-[50%] -translate-y-1/2"
        onClick={() => handleSetIndex(-1)}
      />

      <img
        key={currentIndex}
        className="w-full top-0 left-0 hidden absolute rounded cursor-pointer"
        src={`${photoSources[currentIndex]}.jpg`}
        alt="圖片"
        onLoad={handleImageLoad}
      />
      <FontAwesomeIcon
        icon={faAngleRight}
        className="cursor-pointer h-10 z-[100] absolute right-[-2rem] top-[50%] -translate-y-1/2"
        onClick={() => handleSetIndex(1)}
      />
    </div>
  );
};

export default PhotoBox;
