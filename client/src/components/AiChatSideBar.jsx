import React from "react";
import { IoIosSend } from "react-icons/io";

const AiChatSidebar = () => {
  return (
    <div className="w-70 border-l border-gray-500 flex flex-col">
      <div className="flex-1 p-1">Chats</div>
      <div className="border-t border-gray-500 p-1">
        <input
          type="text"
          placeholder="Ask Ai"
          className="border outline-none px-2 rounded-lg w-full"
        />
        <div className="py-2 flex justify-between">
          <select name="models" id="models" className="border rounded-lg px-1">
            <option value="gemini">Gemini</option>
            <option value="zai">Zai</option>
          </select>
          <button className="border rounded-lg px-4 flex items-center justify-center cursor-pointer bg-emerald-200 hover:bg-emerald-300">
            Send{" "}
            <div className="flex items-center justify-center">
              <IoIosSend size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatSidebar;
