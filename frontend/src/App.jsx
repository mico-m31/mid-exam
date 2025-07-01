import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import LandingPage from "./templates/landingPage";
import Page1 from "./templates/page1";
import Page2 from "./templates/page2";

function Navbar() {
  return (
    <>
      <div className="p-2 bg-white border-b border-neutral-200">
        <nav className="flex transition-all duration-300 justify-between items-center ">
          <ul className="flex">
            <li className="p-3  cursor-pointer active:text-white flex-none">
              <span>Money Manager</span>
            </li>
          </ul>
          <ul className="flex items-center">
            <li className="p-2 cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-blue-400 active:text-white">
                <Link to="/daily">Daily</Link>
            </li>
            <li className="p-2 cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-blue-400 active:text-white">
              <Link to="/stats">Stats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
function AppContent() {
  const location = useLocation();
  const showNavbar =
    location.pathname === "/daily" || location.pathname === "/stats";

  return (
    <div className="bg-black min-h-screen">
      { showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/daily" element={<Page1 />} />
        <Route path="/stats" element={<Page2 />} />
        
      </Routes>
    </div>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
