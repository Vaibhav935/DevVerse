import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { initialFiles } from "../constants/languages";

const CodeEditor = () => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [filesCode, setFilesCode] = useState(initialFiles);

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="px-1 py-2 flex w-full justify-end">
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          name="supportedLanguages"
          className=" border rounded-lg outline-none"
        >
          {Object.keys(initialFiles).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          language={currentLanguage}
          value={filesCode[currentLanguage]}
          defaultValue={`// Selected language ${currentLanguage}`}
          onChange={(value) => {
            setFilesCode((prev) => ({
              ...prev,
              [currentLanguage]: value,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
