import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    datePosted:{
        type:String,
        required:true,
    },
    jobLocation:{
        type:String,
        required:true,
    },
    currency:{
           type:String,
        required:true,
    },
    value:{
           type:String,
        required:true,
    },
    unitText:{
           type:String,
        required:true,
    },
})
const Career = mongoose.models.Career || mongoose.model('Career', newSchema);
export default Career;
