import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { DefaultLayot } from "./components/layouts/DefaultLayot"
import { AddStudentPage, StudentPage, UpdateStudentPage } from "./pages/student"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayot />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/add" element={<AddStudentPage />} />
        <Route path="/student/:id" element={<UpdateStudentPage />} />
      </Route>
    </Routes>
  )
}
