import React, { useEffect, useRef, useState } from "react";
const text = [
  "This Is Samuel Chao... Welcome...",
  "I am a Web Developer...",
  "Hahaha...",
  "The End......",
];

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initiateText = "Please Scroll To Start...";
  const [visibleChars, setVisibleChars] = useState(initiateText.length);
  const [showText, setShowText] = useState(initiateText);
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const { scrollTop, scrollHeight } = containerRef.current;
        const portion = scrollHeight / text.length;
        const index = Math.floor(scrollTop / portion);
        const percentage = ((scrollTop % portion) / portion) * 100;
        if (scrollTop === 0) {
          setShowText(initiateText);
          setVisibleChars(initiateText.length);
        }
        console.log(percentage);
        if (scrollTop > 0) {
          setShowText(text[index]);
          setVisibleChars(
            Math.floor((text[index].length * percentage) / 100 + 1)
          );
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar"
    >
      <div
        className={`relative`}
        style={{
          height: text.length * 1000 + "%",
        }}
      >
        <h1 className="w-full text-4xl font-bold sticky top-1/2 -translate-y-1/2 pt-4 text-center word-spacing-[1rem] tracking-widest">
          {/* {showText.split("").map((char, index) => (
            <>{index < visibleChars && <span key={index}>{char}</span>}</>
          ))} */}
          {showText.split("").map((char, index) => {
            if (index < visibleChars) return <span key={index}>{char}</span>;
          })}
          {/* {showText.split("").map((char, index) => (
            <span
              key={index}
              className={`transition-opacity duration-300 ease-in-out ${
                index < visibleChars ? "opacity-100" : "opacity-0"
              }`}
            >
              {char}
            </span>
          ))} */}
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
