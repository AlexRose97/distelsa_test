import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Input } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { AssignmentType, EmptyAssignmentType } from "./types";
import { Select, SelectItem } from "@nextui-org/react";

import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig";
import CustomAlert from "../../hooks/CustomAlert";
import { CourseType } from "../maintenance/course/types";
import { StudentType } from "../maintenance/student/types";

export const AddAssignmentPage = () => {
  const navigate = useNavigate();
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [assignment, setAssignment] = useState<AssignmentType>({ ...EmptyAssignmentType });
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    setLoading(true);
    try {
      const resultCourse = await ApiClient.get(API_URLS.COURSES);
      if (resultCourse.error) {
        throw new Error(resultCourse.error);
      }
      setCourse(resultCourse.data);//data to filter

      const resultStudents = await ApiClient.get(API_URLS.STUDENTS);
      if (resultStudents.error) {
        throw new Error(resultStudents.error);
      }
      setStudents(resultStudents.data);//data to filter
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = e;
    setCourse((item) => ({ ...item, [name]: value }))
  }
  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target: { value, name } } = e;
    console.log({ value, name })
    setAssignment((item) => ({ ...item, [name]: Number(value) }))
  };

  const saveChange = async () => {
    setLoadingAdd(true);
    try {
      const result = await ApiClient.post(`${API_URLS.ASSIGNMENTS}`, assignment);
      if (result.error) {
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      navigate("/assignment")
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoadingAdd(false);
    }
  }

  return (
    <Container>
      <Typography textAlign={"center"} variant="h3">
        Asignar Curso
      </Typography>
      <Stack direction={"column"} spacing={3} justifyContent={"center"} alignItems={"center"} padding={5}>
        <Select
          value={String(assignment.id_course)}
          label="Curso"
          name="id_course"
          className="max-w-xl"
          onChange={onChangeSelect}
        >
          {courses.map(item => (
            <SelectItem key={item.id_course} value={item.id_course}>{item.name}</SelectItem>
          ))}
        </Select>
        <Select
          value={String(assignment.id_student)}
          label="Estudiante"
          name="id_student"
          className="max-w-xl"
          onChange={onChangeSelect}
        >
          {students.map(item => (
            <SelectItem key={item.id_student} value={item.id_student}>{`${item.dpi} - ${item.name} ${item.last_name}`}</SelectItem>
          ))}
        </Select>
        <Input label="ESTATUS" className="max-w-xl" value={assignment.status} name="status" onChange={onChange} disabled></Input>
        <Stack direction={"row"} spacing={10} >
          <Button color="secondary" size="lg" endContent={<SaveIcon />}
            onClick={saveChange}
            isLoading={loadingAdd}
          >
            Guardar
          </Button>
          <Button color="primary" size="lg" endContent={<ReplyIcon />}
            onClick={() => { navigate("/assignment") }}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
