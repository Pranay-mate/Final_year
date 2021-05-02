import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
  skill: [{type: String, required:  true }],
});

export default mongoose.model("skills", skillSchema);