// components/Removebtn.tsx 
"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'



interface RemovebtnProps {
  id: string;
}
const Removebtn: React.FC<RemovebtnProps> = ({ id }) => {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`,
        { method: "DELETE" }
      )
      if (res.ok) {
        router.refresh();
      }
    }
  }
  return (

    <button onClick={removeTopic} className='text-red-400'>
      <HiOutlineTrash size={24} />
    </button>
  )
}

export default Removebtn;