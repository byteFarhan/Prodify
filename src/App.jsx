import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="text-center font-bold text-3xl font-unbounded">NavBar</h1>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
