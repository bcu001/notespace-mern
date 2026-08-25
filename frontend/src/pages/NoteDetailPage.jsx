import LoadingUI from "@/components/LoadingUI"
import api from "@/lib/axios"
import { Trash2 } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"

const NoteDetailPage = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: {isSubmitting},
    } = useForm()
    const [note, setNote] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
      const fetchNote = async()=>{
        try{
          const res = await api.get(`/notes/${id}`)
          setNote(res.data.data);
          reset({
            title: res.data.data.title,
            content: res.data.data.content,
          });
        } catch(error){
          console.log("Error while fetching note: ",error);
          toast.error("Failed to fetch note!");
        } finally{
          setLoading(false);
        }
      }
      fetchNote();
    },[id, reset])
    
    const onSubmit = async(data) =>{
      try{
        const res = await api.put(`/notes/${id}`, data);
        
        if(res.data.data) {
          toast.success("Note Updated!");
          navigate("/")
        }      
      } catch(error){
        console.error("Error at updating Note form: ",error);
        if(error.response.status === 429){
          toast.error("Show down! You're creating notes too fast", {
            duration:4000,
            icon: "💀"
          })
        } else {
          toast.error("Error at updating note")
        }
      }
    }

    const handleDelete = async()=>{
       if(!window.confirm("Are you sure you want to delete this note?")) return;

       try{
          await api.delete(`notes/${id}`);
          toast.success("Note deleted!")
          navigate("/");
        } catch(error){
          console.error("Error at Note Deleting: ", error);
          toast.error("Failed to delete note!");
        }
    }
  
    const onInvalid = ()=>{
      toast.error("All field are required!",{
        duration:1500,
      })
    }

    if(loading) return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingUI/>
      </div>
    )
  
    return (
      <div className="min-h-screen bg-base-200 ">
        <div className="container mx-auto px-4 py-9 ">
          <div className="max-w-2xl  mx-auto">
            <div className="flex justify-between">
              <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeft className="size-5"/>
              <span>Back to Notes</span>
            </Link>
              <button onClick={handleDelete}  className="btn btn-outline mb-6 text-error">
              <Trash2 className="size-5"/>
              <span>Delete Note</span>
            </button>
            
            </div>
            <div className="card">
              <div className="card-body">
                <h1>Edit Note</h1>
                 <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="form flex flex-col">
                  <div className="">
                    <label htmlFor="title" className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input id="title"  placeholder="Note Title" {...register("title",{required:true})}  className="w-full input input-bordered"/>
                  </div>
  
                  <div> 
                    <label htmlFor="content" className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea id="content" placeholder="Write your note here..." {...register("content", { required: true })} className="textarea textarea-bordered w-full" />
                  </div>
  
                  <button className="btn mt-2 btn-primary" type="submit">
                    {isSubmitting ? "Updating..." : "Update Note"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NoteDetailPage
