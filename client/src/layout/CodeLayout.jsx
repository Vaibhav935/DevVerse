import React from "react";
import Body from "../components/code/Body";
import Footer from "../components/code/Footer";
import Header from "../components/code/Header";

const CodeLayout = () => {
  return (
    <div className="flex  flex-col h-screen bg-[#191A1B] text-white/70">
      <div>
        <Header />
      </div>
      <div className="flex-1 flex">
        <Body />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CodeLayout;
