import React from "react";
import Header from "../components/Header/Header";
import Navbar from "../components/NavBar/NavBar";
import "../App.css";

const HomePage = () => {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Header />
      </div>
    </div>
  );
};

export default HomePage;
