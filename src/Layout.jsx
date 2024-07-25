import { Outlet } from "react-router-dom";
import { SidebarComponent, Topbar } from "./components"; // Assuming imports
import { useState } from "react";

export const Layout= ()=> {
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <div className="app">
      <SidebarComponent isSidebar={isSidebar} />
      <main className="content">
        <Topbar  setIsSidebar={setIsSidebar}/>
        <Outlet />
      </main>
    </div>
  );
}


