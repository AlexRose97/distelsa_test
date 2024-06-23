import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { DefaultLayot } from "./components/layouts/DefaultLayot"
import { AddStudentPage, StudentPage, UpdateStudentPage } from "./pages/student"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayot />}>
        <Route path="/" element={<HomePage />} />
        {/* maintenance */}
        <Route path="/maintenance" element={<HomePage />} />
        {/* student */}
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/add" element={<AddStudentPage />} />
        <Route path="/student/:id" element={<UpdateStudentPage />} />
        {/* course */}
        <Route path="/course" element={<HomePage />} />
        <Route path="/course/add" element={<HomePage />} />
        <Route path="/course/:id" element={<HomePage />} />
        {/* Assignment */}
        <Route path="/Assignment" element={<HomePage />} />
        <Route path="/Assignment/add" element={<HomePage />} />
        <Route path="/Assignment/:id" element={<HomePage />} />
        {/* Logs */}
        <Route path="/Logs" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
