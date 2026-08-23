import { Route,Routes } from "react-router"
import HomePage from "@/pages/HomePage";
import CreatePage from "@/pages/CreatePage";
import NoteDetailPage from "@/pages/NoteDetailPage";

const AppRoutes = () => {
  return (
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailPage/>}/>
      </Routes>
  )
}

export default AppRoutes
