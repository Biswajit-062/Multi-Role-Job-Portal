import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  console.log("COMPANIES", companies);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span>No Job Added</span>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this job?")) {
                            try {
                              const token = localStorage.getItem("token");
                              const response = await fetch(`http://localhost:5011/api/job/delete/${job._id}`, {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                  "Authorization": `Bearer ${token}`,
                                },
                                credentials: 'include',
                              });
                              const data = await response.json();
                              if (response.ok) {
                                alert("Job deleted successfully");
                                window.location.reload();
                              } else {
                                alert(data.message || "Failed to delete job");
                              }
                            } catch (error) {
                              alert("Error deleting job");
                            }
                          }
                        }}
                        className="flex items-center gap-2 w-fit cursor-pointer text-black"
                      >
                        <Trash2 className="w-4" />
                        <span className="text-black">Delete</span>
                      </div>
                      <hr />
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-1">
                        <Eye className="w-4"></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;