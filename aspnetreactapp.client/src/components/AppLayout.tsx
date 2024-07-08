import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const AppLayout: React.FC = () => {
  return (
    <div className="AppLayout max-w-[1280px] min-w-[1080px] flex flex-wrap gap-y-[1rem] justify-center mx-auto py-[1rem] px-[2rem] animate-fade-in-down">
      <Header />
      <div className="AppContent w-full min-h-[calc(100vh-6rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
