//api/topics/route.ts

import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}


export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch topics from the database
    const topics = await Topic.find();

    // Return the topics in the response
    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}

export async function DELETE(request:any){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}