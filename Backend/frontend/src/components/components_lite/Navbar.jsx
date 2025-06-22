import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16 max-w-full lg:max-w-7xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-[#6B3AC2]">Job</span>{" "}
            <span className="text-[#FA4F09]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center">
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <ul className="flex font-medium items-center gap-3 sm:gap-4 md:gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <Link to={"/Home"}>Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/Browse"}>Browse</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to={"/Jobs"}>Jobs</Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/Creator"}>Feedback</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className=" flex items-center gap-2">
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/register"}>
                {" "}
                <Button className="bg-red-600  hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600  ">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        {" "}
                        <Link to={"/Profile"}> Profile</Link>{" "}
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <ul className="flex flex-col gap-4">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/Home" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Browse" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/Jobs" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/Creator" className="block py-2 px-4 hover:bg-gray-100 rounded">
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4 px-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 px-4">
              <div className="flex items-center gap-4 py-4 border-t">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
                <div>
                  <h3 className="font-medium">{user?.fullname}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {user && user.role === "Student" && (
                  <Link to="/Profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User2 className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={logoutHandler}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;