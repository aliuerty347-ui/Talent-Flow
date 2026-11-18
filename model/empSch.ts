import mongoose from "mongoose";

const newSchema=new mongoose.Schema<any>({
    name:{
        type:String,
        required:true,
    } ,
    position:{
        type:String,
        required:true,
    } ,
    role:{
        type:String,
        required:true,
    } ,
    email:{
        type:String,
        required:true,
    } ,
    phone: {
        type: String,
        required: false, // رقم الهاتف (اختياري أو إلزامي حسب رغبتك)
    },
    department: {
        type: String,
        required: false, // القسم أو الإدارة (مثل: قسم البرمجة، الموارد البشرية)
    },
    salary: {
        type: Number,
        required: false, // الراتب
    },
    address: {
        type: String,
        required: false, // العنوان
    },
    hireDate: {
        type: Date,
        default: Date.now, // تاريخ التعيين (يُسجل تلقائياً تاريخ اليوم)
    },
}, { timestamps: true }); // يضيف تلقائياً وقت إنشاء وتحديث السجل


const employCard = mongoose.models.employCard || mongoose.model('employCardCard', newSchema);
export default employCard;