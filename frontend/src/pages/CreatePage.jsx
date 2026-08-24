import api from "@/lib/axios"
import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"

const CreatePage = () => {
   const {
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm()
  const navigate = useNavigate();

  const onSubmit = async(data) =>{
    try{
      const res = await api.post(`/notes`,{...data});
      
      console.log({data});
      if(res.data.data) {
        toast.success("Note Created!");
        navigate("/")
      }      
    } catch(error){
      console.error("Error at creating Note form: ",error);
      if(error.response.status === 429){
        toast.error("Show down! You're creating notes too fast", {
          duration:4000,
          icon: "💀"
        })
      } else {
        toast.error("Error at creating note")
      }
    }
  }

  const onInvalid = (errors)=>{
    toast.error("All field are required!",{
      duration:1500,
    })
  }

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-9 ">
        <div className="max-w-2xl  mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeft className="size-5"/>
            <span>Back to Notes</span>
          </Link>
          <div className="card">
            <div className="card-body">
              <h1>Create New Note</h1>
               <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="form flex flex-col">
                <div className="">
                  <label htmlFor="title" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input id="title" placeholder="Note Title" {...register("title",{required:true})}  className="w-full input input-bordered"/>
                </div>

                <div> 
                  <label htmlFor="content" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea id="content" placeholder="Write your note here..." {...register("content", { required: true })} className="textarea textarea-bordered w-full" />
                </div>

                <button className="btn mt-2 btn-primary" type="submit">
                  {isSubmitting ? "Creating..." : "Create Note"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
