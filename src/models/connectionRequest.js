import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: "{VALUE} is not supported",
            },
        },
    },

    { timestamps: true }
);

schema.index({ fromUserId: 1, toUserId: 1 });
export default new model("ConnectionRequest", schema);
