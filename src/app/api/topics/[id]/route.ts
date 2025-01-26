import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }  // Use primitive 'string' instead of 'String'
) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Use primitive 'string' here as well
) {
  const { id } = params;  // No need to await 'params'
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });

  if (!topic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic }, { status: 200 });
}
