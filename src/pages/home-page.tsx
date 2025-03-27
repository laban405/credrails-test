import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="flex items-center flex-col ">
        <h1 className="text-2xl mb-10">Quick Links</h1>
        <NavLink to="/upload" className="hover:text-primary mb-8">
          Upload
        </NavLink>
        <NavLink to="/details" className="hover:text-primary">
          Details
        </NavLink>
      </div>
    </>
  );
}

export default HomePage;
