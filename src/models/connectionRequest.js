const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ignored", "interested", "accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserId: 1 }, { toUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You can not send connection req to yourself");
  }
  next();
});
const ConnectionRequestModel = new mongoose.model(
  "Connection Request",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
