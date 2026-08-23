import { Plus } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl text-primary text-bold font-mono tracking-tight'>NoteSpace</h1>
                <Link to={"/create"} className='btn btn-primary'>
                    <Plus className='size-5'/>
                    <span>New Note</span>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar
