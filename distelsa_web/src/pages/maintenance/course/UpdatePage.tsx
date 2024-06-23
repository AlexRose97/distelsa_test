import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Input } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { CourseType, EmptyCourseType } from "./types";


import ApiClient from '../../../services/apiClient';
import API_URLS from "../../../services/apiConfig";
import CustomAlert from "../../../hooks/CustomAlert";

export const UpdateCoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseType>({ ...EmptyCourseType });
  const { errorAlert, successAlert } = CustomAlert();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = e;
    setCourse((item) => ({ ...item, [name]: value }))
  }

  useEffect(() => {
    console.log(id)
    if (id) {
      getData();
    }
  }, [id])

  const getData = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(`${API_URLS.COURSES}/${id}`);
      console.log(result.data)
      if (result.error) {
        throw new Error(result.error);
      }
      setCourse(result.data)
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const saveChange = async () => {
    setLoadingUpdate(true);
    try {
      const result = await ApiClient.put(`${API_URLS.COURSES}/${id}`, course);
      if (result.error) {
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      navigate("/maintenance/course")
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
        Actualizar Estudiante
      </Typography>
      <Stack direction={"column"} spacing={3} justifyContent={"center"} alignItems={"center"} padding={5}>
        <Input label="NOMBRE" className="max-w-xl" value={course.name} name="name" onChange={onChange}></Input>
        <Input label="DESCRIPCION" className="max-w-xl" value={course.description} name="description" onChange={onChange}></Input>
        <Input label="CREDITOS" className="max-w-xl" value={String(course.credits)} name="credits" onChange={onChange}></Input>
        <Stack direction={"row"} spacing={10} >
          <Button color="secondary" size="lg" endContent={<SaveIcon />}
            onClick={saveChange}
            isLoading={loadingUpdate}
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
