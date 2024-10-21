import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(true); // Set true if the user is logged in, false otherwise
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    navigate("/"); // Navigate to the home page first
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <nav className="flex items-center justify-between px-5 py-2 mb-5 border-b border-b-gray-400 w-full">
      {/* Logo */}
      <img
        className="w-10 cursor-pointer"
        src="https://pbs.twimg.com/profile_images/3257892322/6967dd1ccbc3c62b6c432cdc109f28c9_400x400.jpeg"
        alt="MediMeet logo"
        onClick={() => navigate("/")}
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex justify-center items-center gap-8 font-medium mx-auto">
        <Link to="#" onClick={() => handleScrollToSection("home")}>
          <li className="py-1 cursor-pointer hover:text-primary">Home</li>
        </Link>
        <Link to="#" onClick={() => handleScrollToSection("techstack")}>
          <li className="py-1 cursor-pointer hover:text-primary">Tech Stack</li>
        </Link>
        <Link to="#" onClick={() => handleScrollToSection("projects")}>
          <li className="py-1 cursor-pointer hover:text-primary">Projects</li>
        </Link>
        <Link to="#" onClick={() => handleScrollToSection("contact")}>
          <li className="py-1 cursor-pointer hover:text-primary">Contact</li>
        </Link>
      </ul>

      {/* Profile & CTA */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full"
                src="https://i.pravatar.cc/150?img=12"
                alt="profile_pic"
              />
              <img
                className="w-4"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfy9d4gjzYBIJOk80QGsV0DN04RY4PT3uYw&s"
                alt="dropdown_arrow"
              />
            </div>

            {/* Dropdown menu */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-400 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-projects")}
                  className="hover:text-black cursor-pointer"
                >
                  My Projects
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Hamburger Menu for Mobile */}
        <img
          onClick={() => setShowMenu(!showMenu)}
          className="w-6 md:hidden cursor-pointer"
          src="https://cdn-icons-png.freepik.com/512/5368/5368475.png"
          alt="menu icon"
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 text-lg md:hidden z-30">
          <Link
            to="#"
            onClick={() => {
              setShowMenu(false);
              handleScrollToSection("home");
            }}
          >
            <p className="cursor-pointer">Home</p>
          </Link>
          <Link
            to="#"
            onClick={() => {
              setShowMenu(false);
              handleScrollToSection("techstack");
            }}
          >
            <p className="cursor-pointer">Tech Stack</p>
          </Link>
          <Link
            to="#"
            onClick={() => {
              setShowMenu(false);
              handleScrollToSection("projects");
            }}
          >
            <p className="cursor-pointer">Projects</p>
          </Link>
          <Link
            to="#"
            onClick={() => {
              setShowMenu(false);
              handleScrollToSection("contact");
            }}
          >
            <p className="cursor-pointer">Contact</p>
          </Link>

          <button
            onClick={() => {
              setShowMenu(false);
              navigate("/login");
            }}
            className="bg-primary text-white px-6 py-3 rounded-full"
          >
            Create Account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
