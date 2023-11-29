import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/admin") {
      // If we are on admin page then we should navigate to register page
      navigate("/");
    } else if (location.pathname === "/candidatesList") {
      navigate("/admin");
    } else {
      // If not then to admin page
      navigate("/admin");
    }
  };

  return (
    <div className="bg-white w-full z-20 drop-shadow-2xl fixed border-gray-200 dark:bg-gray-700  flex justify-between items-center leading-10 p-2">
      <Link to="/">
        <img
          src="https://assets-global.website-files.com/62f24893562f47d8766501aa/62f24ef3fde2c2f124a46baf_teachforindia_logo.svg"
          alt="Logo"
        />
      </Link>
      {location.pathname === "/candidatesList" ? (
        <button
          className=" bg-blue-500 text-slate-200 px-4 rounded-md"
          onClick={()=>{
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            navigate("/admin");
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className=" bg-blue-600 text-white font-bold px-4 rounded-md"
          onClick={handleClick}
        >
          {location.pathname === "/admin" ? "Register" : "Admin"}
        </button>
      )}
    </div>
  );
};

export default Header;
