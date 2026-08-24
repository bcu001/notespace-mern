import { Notebook } from "lucide-react"
import { Link } from "react-router"

const NoNoteFoundUI = () => {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full border border-primary/20 bg-primary/10 p-4">
        <Notebook className="size-10 text-primary" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">No notes found</h2>
      <p className="mt-3 max-w-md text-base-content/60">
        Your ideas are waiting for their first page. Start writing something worth remembering.
      </p>
      <Link to="/create" className="btn btn-primary mt-6">
        Create your first note
      </Link>
    </div>
  )
}

export default NoNoteFoundUI
