import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="text-center py-4 sm:py-8 px-4">
        <p className="text-sm sm:text-base mb-2">© 2025 Job Nest. All rights reserved.</p>
        <p className="text-sm sm:text-base mb-2">
          Powered by <a href="https://github.com/Biswajit-062" className="hover:underline">Biswajit</a>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-4 text-sm sm:text-base">
          <Link to={"/PrivacyPolicy"} className="hover:underline">Privacy Policy</Link>
          <span className="hidden sm:inline">|</span>
          <Link to={"/TermsofService"} className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;