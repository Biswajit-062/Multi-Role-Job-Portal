import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/JobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-3 sm:gap-5 my-5 sm:my-10">
          <span className="px-3 sm:px-4 mx-auto flex justify-center items-center py-1 sm:py-2 gap-2 rounded-full bg-gray-200 text-red-600 text-sm sm:text-base font-medium">
            <span className="text-[#614232]">
              <PiBuildingOfficeBold />
            </span>
            No.1 Job Hunt Website
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="sm:block">Search Apply &</span>
            <span>Get Your <span className="text-[#6A38C2]">Dream Job</span></span>
          </h2>
          <p className="text-sm sm:text-base px-4">
            Start your hunt for the best, life-changing career opportunities
            <span className="hidden sm:inline"> from here in your <br />
            selected areas conveniently and get hired quickly.</span>
            <span className="sm:hidden"> conveniently and get hired quickly.</span>
          </p>
          <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto px-2 sm:px-0">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full py-2 pl-4 pr-2 rounded-l-full"
            />
            <Button onClick={searchjobHandler} className=" rounded-r-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;