import axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/JobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  const fetchAppliedJobs = useCallback(async () => {
    try {
      const res = await axios.get(`/api/application/get`, {
        withCredentials: true,
      });
      console.log("API Response:", res.data);
      if (res.data.success) {
        dispatch(setAllAppliedJobs(res.data.applications));
      } else {
        console.error("Failed to fetch applied jobs:", res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Please login to fetch applied jobs.");
      } else {
        console.error("Error fetching applied jobs:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  return { fetchAppliedJobs };
};

export default useGetAppliedJobs;
