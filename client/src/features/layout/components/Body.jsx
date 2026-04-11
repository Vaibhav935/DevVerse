import React from "react";
import SideBar from "./SideBar";
import SideBarExpansion from "@/features/layout/components/SideBarExpansion";
import AiChatSidebar from "@/features/ai-chat/components/AiChatSideBar";
import TerminalComponent from "@/features/terminal/components/Terminal";
import CodeEditor from "@/features/editor/components/CodeEditor";

const Body = () => {
  return (
    <div className="flex h-full">
      <SideBar />
      <SideBarExpansion />
      <div className="flex-1 flex flex-col">
        <CodeEditor />
        <TerminalComponent />
      </div>
      <AiChatSidebar />
    </div>
  );
};

export default Body;
