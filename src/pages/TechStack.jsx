import React, { useState } from "react";

const TechStack = () => {
  // State to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("App Development");

  // Data for the technologies in each category
  const techData = {
    "App Development": [
      { name: "Flutter", icon: "/Flutter 1.svg" },
      { name: "Dart", icon: "/Dart 1.svg" },
      { name: "Figma", icon: "/figma 1.svg" },
      { name: "Postman", icon: "/postman 1.svg" },
    ],
    "Web Development": [
      { name: "HTML", icon: "/html 1.svg" },
      { name: "CSS", icon: "/css 1.svg" },
      { name: "React", icon: "/reactjs 1.svg" },
      { name: "JavaScript", icon: "/javascript 2.svg" },
      { name: "Node.js", icon: "/nodejs 1.svg" },
    ],
    "Graphic Designing": [
      { name: "Photoshop", icon: "/photoshop 1.svg" },
      { name: "Canva", icon: "/canva 1.svg" },
    ],
  };

  return (
    <section id="techstack" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
          Our Tech Stack
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center mb-6 space-x-2 space-y-2 sm:space-y-0">
          {Object.keys(techData).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              } transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {techData[selectedCategory].map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-12 h-12 md:w-16 md:h-16 mb-3"
              />
              <p className="text-gray-700 text-sm md:text-base font-semibold">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
