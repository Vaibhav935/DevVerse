import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { geminiApi, hfApi } from "../../../services/ai";

const models = ["gemini", "zai"];

const AiChatSidebar = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentModel, setCurrentModel] = useState("gemini");

  const sendMessage = async () => {
    setAllMessages((prev) => [
      ...prev,
      {
        text: message,
        isOwn: true,
      },
    ]);

    if (currentModel === "gemini") {
      const response = await geminiApi(message);
      setAllMessages((prev) => [
        ...prev,
        {
          text: response?.data?.response,
          isOwn: false,
        },
      ]);
    } else if (currentModel === "zai") {
      const response = await hfApi(message);
      setAllMessages((prev) => [
        ...prev,
        {
          text: response?.data?.response,
          isOwn: false,
        },
      ]);
    }
  };

  return (
    <div className="w-70 border-l border-[#2A2B2C] flex flex-col h-full min-h-0">
      <div className="flex flex-col flex-1 p-1 min-h-0">
        <h1>AI Chat</h1>
        <div className="flex flex-col  flex-1 min-h-0  overflow-y-auto">
          {allMessages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.isOwn ? "justify-end" : null}`}
            >
              <p className="py-1 px-2 rounded m-1 bg-gray-900 max-w-[80%]">
                {message.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#2A2B2C] p-1">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Ask Ai"
          className="border outline-none px-2 rounded-lg w-full border-[#262728] bg-[#202122]"
        />
        <div className="py-2 flex justify-between">
          <select
            name="models"
            id="models"
            className="border rounded-lg px-1 bg-[#202122]"
            value={currentModel}
            onChange={(e) => setCurrentModel(e.target.value)}
          >
            {models.map((model, idx) => {
              return (
                <option key={idx} value={model}>
                  {model}
                </option>
              );
            })}
          </select>
          <button
            onClick={sendMessage}
            className="border border-[#262728] bg-[#202122] rounded-lg px-4 flex items-center justify-center cursor-pointer hover:bg-[#262728]"
          >
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
