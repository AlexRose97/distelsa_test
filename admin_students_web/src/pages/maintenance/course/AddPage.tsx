import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Input } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { CourseType, EmptyCourseType } from "./types";


import ApiClient from '../../../services/apiClient';
import API_URLS from "../../../services/apiConfig";
import CustomAlert from "../../../hooks/CustomAlert";

export const AddCoursePage = () => {
  const navigate = useNavigate();
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseType>({ ...EmptyCourseType });
  const { errorAlert, successAlert } = CustomAlert();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = e;
    setCourse((item) => ({ ...item, [name]: value }))
  }

  const saveChange = async () => {
    setLoadingAdd(true);
    try {
      const result = await ApiClient.post(`${API_URLS.COURSES}`, course);
      if (result.error) {
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      navigate("/maintenance/course")
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
        Crear Curso
      </Typography>
      <Stack direction={"column"} spacing={3} justifyContent={"center"} alignItems={"center"} padding={5}>
        <Input label="NOMBRE" className="max-w-xl" value={course.name} name="name" onChange={onChange}></Input>
        <Input label="DESCRIPCION" className="max-w-xl" value={course.description} name="description" onChange={onChange}></Input>
        <Input label="CREDITOS" className="max-w-xl" value={String(course.credits)} name="credits" onChange={onChange}></Input>
        <Stack direction={"row"} spacing={10} >
          <Button color="secondary" size="lg" endContent={<SaveIcon />}
            onClick={saveChange}
            isLoading={loadingAdd}
          >
            Guardar
          </Button>
          <Button color="primary" size="lg" endContent={<ReplyIcon />}
            onClick={() => { navigate("/maintenance/course") }}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
