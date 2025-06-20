import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

// Create a unique index on name with case-insensitive collation
companySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export const Company = mongoose.model("Company", companySchema);
