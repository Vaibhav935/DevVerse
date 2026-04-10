import React from "react";
import SideBar from "./SideBar";
import SideBarExpansion from "./SideBarExpansion";
import CodeEditor from "./CodeEditor";
import Terminal from "./Terminal";
import AiChatSidebar from "./AiChatSidebar";

const Body = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <SideBarExpansion />
      <div className="flex-1 flex flex-col">
        <CodeEditor />
        <Terminal />
      </div>
      <AiChatSidebar />
    </div>
  );
};

export default Body;
