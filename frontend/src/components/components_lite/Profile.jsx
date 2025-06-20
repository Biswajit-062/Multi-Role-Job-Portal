import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import EditProfileModal from "./EditProfileModel.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const isResume = true;
const Profile = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5011/api/application/get", { withCredentials: true });
        if (res.data.success) {
          setAppliedJobs(res.data.applications);
        } else {
          setError(res.data.message || "Failed to fetch applied jobs");
        }
      } catch (err) {
        setError(err.message || "Error fetching applied jobs");
      }
      setLoading(false);
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>
              <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </span>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold"> Resume</label>
            <div>
              {isResume && user?.profile?.resume ? (
                <a
                  href={user.profile.resume}
                  download
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Download {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
        {loading && <p>Loading applied jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && appliedJobs.length === 0 && (
          <p>You have not applied any job yet.</p>
        )}
        {!loading && !error && appliedJobs.length > 0 && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Job Title</th>
                <th className="border border-gray-300 p-2">Company</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.map((job) => (
                <tr key={job._id} className="text-center">
                  <td className="border border-gray-300 p-2">{job.createdAt.split("T")[0]}</td>
                  <td className="border border-gray-300 p-2">{job.job?.title}</td>
                  <td className="border border-gray-300 p-2">{job.job?.company?.name}</td>
                  <td className="border border-gray-300 p-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-white ${
                        job.status === "accepted"
                          ? "bg-green-600"
                          : job.status === "rejected"
                          ? "bg-red-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
