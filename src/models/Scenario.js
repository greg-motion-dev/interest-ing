import mongoose from "mongoose";

const ScenarioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["compound-interest", "savings-goal", "retirement-gap"],
    },
    startCapital: { type: Number, required: true },
    monthlyRate: { type: Number, required: true },
    duration: { type: Number, required: true },
    interestRate: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Scenario ||
  mongoose.model("Scenario", ScenarioSchema);
