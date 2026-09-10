import dbConnect from "@/lib/dbConnect";
import Scenario from "@/models/Scenario";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const deletedScenario = await Scenario.findByIdAndDelete(id);

    if (!deletedScenario) {
      return NextResponse.json(
        { error: "Scenario not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Scenario deleted succcessfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete scenario:", error);
    return NextResponse.json(
      { error: "Failed to delete scenario" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await request.json();

    const updatedScenario = await Scenario.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedScenario) {
      return NextResponse.json(
        { error: "Scenario not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Scenario updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update scenario:", error);
    return NextResponse.json(
      { error: "Failed to update scenario" },
      { status: 500 },
    );
  }
}
