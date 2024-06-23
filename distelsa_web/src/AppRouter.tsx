import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home/HomePage"
import { DefaultLayot } from "./components/layouts/DefaultLayot"
import { AddStudentPage, StudentPage, UpdateStudentPage } from "./pages/maintenance/student"
import { AddCoursePage, CoursePage, UpdateCoursePage } from "./pages/maintenance/course"
import { Maintenance } from "./pages/maintenance/Maintenance"
import { AssignmentPage, AddAssignmentPage, UpdateAssignmentPage } from "./pages/assignment"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayot />}>
        <Route path="/" element={<HomePage />} />
        {/* maintenance */}
        <Route path="/maintenance" element={<Maintenance />} />
        {/* student */}
        <Route path="/maintenance/student" element={<StudentPage />} />
        <Route path="/maintenance/student/add" element={<AddStudentPage />} />
        <Route path="/maintenance/student/:id" element={<UpdateStudentPage />} />
        {/* course */}
        <Route path="/maintenance/course" element={<CoursePage />} />
        <Route path="/maintenance/course/add" element={<AddCoursePage />} />
        <Route path="/maintenance/course/:id" element={<UpdateCoursePage />} />
        {/* Assignment */}
        <Route path="/Assignment" element={<AssignmentPage />} />
        <Route path="/Assignment/add" element={<AddAssignmentPage />} />
        <Route path="/Assignment/:id" element={<UpdateAssignmentPage />} />
        {/* Logs */}
        <Route path="/Logs" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
