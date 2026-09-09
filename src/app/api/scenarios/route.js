import dbConnect from "@/lib/dbConnect";
import Scenario from "@/models/Scenario";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const scenario = await Scenario.create(body);

    return NextResponse.json(scenario, { status: 201 });
  } catch (error) {
    console.error("Failed to create scenario:", error);
    return NextResponse.json(
      {
        status: "Invalid data of scenario",
        error: error.message,
      },
      { status: 400 },
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const scenario = await Scenario.find({});
    return NextResponse.json(scenario, { status: 200 });
  } catch (error) {
    console.error("Failed to create scenario:", error);
    return NextResponse.json(
      {
        status: "Invalid data of scenario",
        error: error.message,
      },
      { status: 400 },
    );
  }
}
