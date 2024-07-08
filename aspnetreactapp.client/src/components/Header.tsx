import React from "react";
import { PageRoutes } from "../App";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="Header w-full box-content h-[3rem] px-[1rem] flex flex-wrap bg-black-1 rounded">
      <div className="w-full flex flex-wrpa items-center justify-between">
        <h1
          className="text-[1.25rem] cursor-pointer hover:animate-fade-in-out"
          onClick={() => navigate("/")}
        >
          SAMUEL CHAO
        </h1>
        <div className="flex flex-1 gap-x-[1rem] justify-evenly">
          {PageRoutes.map((route, index) => {
            if (route.name === "Home") return;
            return (
              <h3
                key={index}
                className="cursor-pointer hover:animate-fade-in-out-drop"
                onClick={() => navigate(`${route.path}`)}
              >
                {route.name}
              </h3>
            );
          })}
        </div>
        <div className="flex">
          <h3 className="cursor-pointer">104</h3>
        </div>
      </div>
    </div>
  );
};
export default Header;
