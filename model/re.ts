import mongoose from "mongoose";

const news = new mongoose.Schema({
  text: { type: String, required: true },
  cvUrl: { type: String, required: true }, // أو String إذا كنت تخزن مسار الملف أو رابطه
});

const reqq = mongoose.models.reqq || mongoose.model('reqq', news);

export default reqq;