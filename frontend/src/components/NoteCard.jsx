import { Edit } from 'lucide-react'
import { Link } from 'react-router'
import { normalizeDate } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

const NoteCard = ({note}) => {
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
                <button><Edit className='size-5'/></button>
                <button><Trash2 className='size-5 text-red-600'/></button>
            </div>
        </div>
       </div>
     </Link>
  )
}

export default NoteCard
