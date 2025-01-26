//addTopic/page.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {

    if (!title || !description) {
      alert("Title and description cannot be empty");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers:
        {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title, description
        })
      })
        if (res.ok){
          router.push("/")
        }
        else{
          throw new Error("Failed to create a Topic");
        }

      

    } catch (error) {

    }
  };

  return (
    <div>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Topic Title"
          className="outline-none bg-transparent border border-slate-500 px-8 py-2"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Topic Description"
          className="outline-none bg-transparent border border-slate-500 px-8 py-2"
        />
        <input
          className="bg-green-500 font-bold text-white py-3 px-5 rounded-md w-fit cursor-pointer outline-none"
          type="submit"
          defaultValue="Add Topic"
        />
      </form>
    </div>
  );
};

export default page;
