import { Edit } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { normalizeDate } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/axios'

const NoteCard = ({note, setNotes}) => {
  const navigate = useNavigate()

  const handleDelete = async(e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await api.delete(`notes/${id}`);
      setNotes(prev=>prev.filter(note=>note._id !== id))
      toast.success("Note deleted!")
    } catch(error){
      console.error("Error at Note Deleting: ", error);
      toast.error("Failed to delete note!");
    }

  }

  const handleEditNav = (e,id)=>{
    e.preventDefault();
    navigate(`/note/${id}`);
  }

  return (
     <Link to={`/note/${note._id}`}
     className='card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-base-content/30'
     >
       <div className='p-4 flex flex-col'>
         <span className='font-bold'> {note.title} </span>
        <span className='text-base-content/70'> {note.content} </span>
        <div className='flex justify-between items-center mt-2'>
            <span className='text-sm text-base-content/60'>{normalizeDate(note.createdAt)}</span>
            <div className='flex items-center gap-2'>
                <button onClick={(e)=>handleEditNav(e,note._id)} className='btn btn-ghost btn-xs'><Edit className='size-4'/></button>
                <button onClick={(e)=>handleDelete(e,note._id)} className='btn btn-ghost btn-xs text-error'><Trash2 className='size-4'/></button>
            </div>
        </div>
       </div>
     </Link>
  )
}

export default NoteCard
