import mongoose from "mongoose";
const UserModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }, 
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "member",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", UserModel);