import React, { useEffect, useRef, useState } from "react";

const HomePage: React.FC = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const text = "This Is Samuel Chao... Welcome...";

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const scrollPercentage =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
        const newVisibleChars = Math.floor(
          (scrollPercentage / 100) * text.length
        );
        console.log(newVisibleChars);
        setVisibleChars(Math.min(newVisibleChars, text.length));
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
  }, [text.length]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar"
    >
      <div className="h-[200%] relative">
        <h1 className="w-full text-4xl font-bold sticky top-1/2 -translate-y-1/2 pt-4 text-center word-spacing-[1rem] tracking-widest">
          {visibleChars === 0 && (
            <>
              <span className="animate-fade-in-out-none">
                Please Scroll To Start...
              </span>
            </>
          )}
        </h1>
        <h1 className="w-full text-4xl font-bold sticky top-1/2 -translate-y-1/2 pt-4 text-center word-spacing-[1rem] tracking-widest">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className={`transition-opacity duration-300 ease-in-out ${
                index < visibleChars ? "opacity-100" : "opacity-0"
              }`}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
