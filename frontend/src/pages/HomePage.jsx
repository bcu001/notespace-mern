import Navbar from '@/components/Navbar'
import NoteCard from '@/components/NoteCard'
import RateLimitUI from '@/components/RateLimitUI'
import { ENV } from '@/config/env'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    const getNotes = async ()=>{
      try{
        setIsLoading(true);
        const res = await axios.get(`${ENV.VITE_API_URL}/api/notes`);
        setNotes(res.data.data);
        setIsRateLimited(false);
      } catch(error){
        console.error("Error fetch notes: ",error);
        // console.log({error})
        if(error.response.status ===429){
          setIsRateLimited(true);
          toast.error("Too many requests");
        } else{
          toast.error("Failed to load notes");
        }
      } finally{
        setIsLoading(false);
      }
    }

    getNotes();
  },[])

  return (
    <div className='min-h-screen'>
     <Navbar/>

     <div className='mt-5'>
      {isRateLimited && <RateLimitUI/>}
     </div>
     <div className='max-w-7xl mx-auto p-4 mt-6'>
      {isLoading && <div>loading...</div>}
      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {notes.map(note=>{
            return(
             <NoteCard key={note._id} note={note}/>
            )
          })}
        </div>
      )}
     </div>
    </div>
  )
}

export default HomePage
