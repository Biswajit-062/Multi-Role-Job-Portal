import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: { $regex: new RegExp(`^${companyName}$`, 'i') } });
    if (company) {
      return res.status(401).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id; // loggedin user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ message: "No companies found" });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
  }
};

//update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Check for duplicate company name (case-insensitive) excluding current company
    if (name) {
      const existingCompany = await Company.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      if (existingCompany) {
        return res.status(409).json({
          message: "Company already exists",
          success: false,
        });
      }
    }

    let updateData = { name, description, website, location };

    if (file) {
      //cloudinary
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company updated" });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Company already exists",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ message: "Company deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
