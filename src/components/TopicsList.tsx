// components/TopicsList.tsx 

import React from 'react'
import Removebtn from './Removebtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

interface Topic {
    _id: string;
    title: string;
    description: string;
}

const getTopics = async () => {
    try {
        const res = await fetch(
            'http://localhost:3000/api/topics',
            { cache: 'no-store' });
        if (!res.ok) {
            throw new Error("Failed to fetch topics..")
        }
        return res.json();
    } catch (error) {
        console.log('Error loading topics: ', error);
    }
}

const TopicsList = async () => {
    const { topics } = await getTopics();
    return (
        <>
            {topics.map((t: Topic) => (
                <div key={t._id} className='p-4 border border-slate-300 my-3 flex justify-between items-start gap-5'>
                    <div>
                        <h2 className='font-bold text-2xl' >{t.title}</h2>
                        <div>{t.description}</div>
                    </div>
                    <div className='flex gap-2'>
                        <Removebtn id= {t._id}/>
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}

export default TopicsList
