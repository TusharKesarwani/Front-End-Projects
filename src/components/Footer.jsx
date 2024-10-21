import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Inspiringtie Productions. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact Us
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-300">
            <i className="fab fa-facebook-f"></i> {/* Font Awesome icon */}
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            <i className="fab fa-twitter"></i> {/* Font Awesome icon */}
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-300">
            <i className="fab fa-instagram"></i> {/* Font Awesome icon */}
          </a>
          <a href="#" className="text-red-500 hover:text-red-300">
            <i className="fab fa-youtube"></i> {/* Font Awesome icon */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
