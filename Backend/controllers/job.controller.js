import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/email.js";

// Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title || !description || !requirements || !salary || !location ||
      !jobType || !experience || !position || !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    // Fetch all registered users' emails
    const users = await User.find({}, "email");
    const emails = users.map(user => user.email);

    const subject = "New Job Posted on Job Portal";
    const text = `A new job titled "${title}" has been posted. Check it out on the portal!`;
    const html = `
      <h2>🚀 New Job Alert!</h2>
      <p>A new job titled <strong>${title}</strong> has been posted.</p>
      <p><a href="https://yourfrontend.com/jobs" style="color:blue">Click here to view all jobs</a></p>
      <br />
      <small>You are receiving this because you are a registered user on our job portal.</small>
    `;

    // Send emails in parallel and handle errors
    await Promise.all(
      emails.map(email =>
        sendEmail(email, subject, text, html).catch(err =>
          console.error(`❌ Failed to send email to ${email}:`, err.message)
        )
      )
    );

    res.status(201).json({
      message: "Job posted successfully.",
      job,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Users - Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }

    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Users - Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }

    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Admin - Get jobs created by logged-in recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }

    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    return res.status(200).json({ message: "Job deleted successfully", status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};
