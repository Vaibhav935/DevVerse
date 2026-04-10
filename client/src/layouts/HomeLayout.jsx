import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-black/5">
      <div>
        <Header />
      </div>
      <div className="flex-1">
        <Body />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
