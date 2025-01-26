// components/EditTopicForm.tsx 

"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

// Define the type for the props
interface EditTopicFormProps {
    id: string; // 'id' should be a string
    title: string; // 'title' should be a string
    description: string; // 'description' should be a string
}

// Accept the props in the component
const EditTopicForm: React.FC<EditTopicFormProps> = ({ id, title, description }) => {
    const router = useRouter();
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const handleSumbit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({newTitle, newDescription}),
                });
                if (!res.ok){
                    throw new Error("Failed to update!")
                }
                router.refresh();
                router.push('/');
                

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <form className='flex flex-col gap-3' action={handleSumbit}>
                    <input type="text"
                        onChange={e => setNewTitle(e.target.value)}
                        value={newTitle}
                        placeholder='Topic Title' className='outline-none bg-transparent  border border-slate-500 px-8 py-2' />
                    <input
                        onChange={e => setNewDescription(e.target.value)}
                        value={newDescription}
                        type="text" placeholder='Topic Description' className='outline-none bg-transparent  border border-slate-500 px-8 py-2' />
                    <input
                        className='bg-green-500 font-bold text-white py-3 cursor-pointer px-5 rounded-md w-fit'
                        defaultValue={"Update Topic"}
                        type="Submit" />
                </form>
            </div>
        </div>
    )
}

export default EditTopicForm;