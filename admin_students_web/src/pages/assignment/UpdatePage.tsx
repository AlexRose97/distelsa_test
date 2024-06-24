import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Input } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { AssignmentType, EmptyAssignmentType, StatusList } from "./types";
import { Select, SelectItem } from "@nextui-org/react";


import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig";
import CustomAlert from "../../hooks/CustomAlert";
import { CourseType } from "../maintenance/course/types";
import { StudentType } from "../maintenance/student/types";

export const UpdateAssignmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [assignment, setAssignment] = useState<AssignmentType>({ ...EmptyAssignmentType });
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [students, setStudents] = useState<StudentType[]>([]);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    if (id) {
      getAllData();
    }
  }, [id])


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

      const result = await ApiClient.get(`${API_URLS.ASSIGNMENTS}/${id}`);
      if (result.error) {
        throw new Error(result.error);
      }
      setAssignment({
        ...result.data,
        status: StatusList.find(x => String(result.data.status).toUpperCase() === String(x.label).toUpperCase())?.code//get Label of status
      })//data assignment
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target: { value, name } } = e;
    setAssignment((item) => ({ ...item, [name]: Number(value) }))
  };

  const saveChange = async () => {
    setLoadingUpdate(true);
    try {
      const result = await ApiClient.put(`${API_URLS.ASSIGNMENTS}/${id}`,
        {
          ...assignment,
          status: StatusList.find(x => String(assignment.status) === String(x.code))?.label//get Label of status
        }
      );
      if (result.error) {
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      navigate("/assignment")
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  }

  return (
    <Container>
      <Typography textAlign={"center"} variant="h3">
        Actualizar Asignación
      </Typography>
      <Stack direction={"column"} spacing={3} justifyContent={"center"} alignItems={"center"} padding={5}>
        <Select
          selectedKeys={[String(assignment.id_course)]}
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
          selectedKeys={[String(assignment.id_student)]}
          label="Estudiante"
          name="id_student"
          className="max-w-xl"
          onChange={onChangeSelect}
        >
          {students.map(item => (
            <SelectItem key={item.id_student} value={item.id_student}>{`${item.dpi} - ${item.name} ${item.last_name}`}</SelectItem>
          ))}
        </Select>
        <Select
          selectedKeys={[String(assignment.status)]}
          label="ESTATUS"
          name="status"
          className="max-w-xl"
          onChange={onChangeSelect}
        >
          {StatusList.map(item => (
            <SelectItem key={item.code} value={item.label}>{`${item.label}`}</SelectItem>
          ))}
        </Select>
        <Stack direction={"row"} spacing={10} >
          <Button color="secondary" size="lg" endContent={<SaveIcon />}
            onClick={saveChange}
            isLoading={loadingUpdate}
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
