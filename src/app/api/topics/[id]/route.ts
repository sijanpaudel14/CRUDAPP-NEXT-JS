import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse, NextRequest } from "next/server";

// PUT handler
export async function PUT(request: NextRequest) {
  const { newTitle: title, newDescription: description } = await request.json();
  const id = request.nextUrl.pathname.split('/')[4];  // Extracts the ID from the URL

  await connectMongoDB();
  const updatedTopic = await Topic.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  if (!updatedTopic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Topic updated", updatedTopic },
    { status: 200 }
  );
}

// GET handler
export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/')[4];  // Extracts the ID from the URL

  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });

  if (!topic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic }, { status: 200 });
}
