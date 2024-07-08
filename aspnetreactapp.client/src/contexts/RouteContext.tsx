import React, { createContext, useContext, useState } from "react";

const RouteContext = createContext(null);
function RouteContextProvider({ children }: { children: React.ReactNode }) {
  const routes = [];
  // return (
  //     <RouteContext.Provider value={{ route, setRoute }}>
  //     {children}
  //     </RouteContext.Provider>
  // );
}
