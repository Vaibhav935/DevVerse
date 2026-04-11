import React, { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 16,
      theme: {
        background: "#1e1e1e",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    term.write("Welcome to your terminal\r\n");
    term.onData((data) => {
      term.write(data);
    });

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className=" border-t border-gray-500 h-50 flex flex-col">
      <div className="px-1 flex justify-between border-b border-gray-500">
        <h1>Terminal</h1>
        <div className="flex items-center justify-center cursor-pointer">
          <RxCross2 />
        </div>
      </div>

      <div className="overflow-hidden h-full w-full flex-1">
        <div ref={terminalRef} className="h-full w-full " />
      </div>
    </div>
  );
};

export default TerminalComponent;
