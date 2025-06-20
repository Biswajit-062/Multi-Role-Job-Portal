import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";


const JobCards = ({job}) => {
  console.log(job);
  const navigate = useNavigate();
 
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 transition-all duration-200">
      <div>
        <h1 className="text-base sm:text-lg font-medium"> {job.name} </h1>
        <p className="text-xs sm:text-sm text-gray-600">India</p>
      </div>
      <div className="mt-2 sm:mt-0">
        <h2 className="font-bold text-base sm:text-lg my-1 sm:my-2">{job.title}</h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center mt-3 sm:mt-4">
        <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
          {job.position} Open Positions
        </Badge>
        <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
          {job.salary}LPA
        </Badge>
        <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>
          {job.location}
        </Badge>
        <Badge className={" text-black font-bold"} variant={"ghost"}>
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;