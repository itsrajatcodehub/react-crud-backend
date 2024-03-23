import mongoose from "mongoose";
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
});

export default mongoose.model('userDetails', userDetailsSchema);
