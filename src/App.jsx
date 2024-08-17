import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar isScrolled={isScrolled}></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
