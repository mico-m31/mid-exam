import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Page1 from "./templates/page1";
import Page2 from "./templates/page2";

function Navbar() {
  return (
    <>
      <div className="p-2 bg-white border-b border-neutral-200">
        
        <nav className="flex flex-row-reverse transition-all duration-300">
          <ul className="flex border-black">
            <li className="p-3 border-b-2 border-transparent cursor-pointer hover:bg-gray-100 hover:border-b-2 hover:border-black active:text-white">Money Manager</li>
            <li className="p-3 cursor-pointer hover:bg-gray-100 hover:border-b-2  hover:border-black active:text-white">
              <Link to="/">Calendar</Link>
            </li>
            <li className="p-3 cursor-pointer hover:bg-gray-100 hover:border-b-2 hover:border-black active:text-white">
              <Link to="/daily">Daily</Link>
            </li>
            <li className="p-3 cursor-pointer hover:bg-gray-100 hover:border-b-2 hover:border-black active:text-white">
              <Link to="/stats">Stats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

function App() {


  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar
    
        />

        <Routes>
          <Route
            path="/"
            element={
              <Page1
              />
            }
          />
          <Route path="/daily" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
