import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Input } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { StudentType, EmptyStudentType } from "./types";


import ApiClient from '../../../services/apiClient';
import API_URLS from "../../../services/apiConfig";
import CustomAlert from "../../../hooks/CustomAlert";

export const UpdateStudentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [student, setStudent] = useState<StudentType>({ ...EmptyStudentType });
  const { errorAlert, successAlert } = CustomAlert();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value, name } } = e;
    setStudent((item) => ({ ...item, [name]: value }))
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
      const result = await ApiClient.get(`${API_URLS.STUDENTS}/${id}`);
      console.log(result.data)
      if (result.error) {
        throw new Error(result.error);
      }
      setStudent(result.data)
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
      const result = await ApiClient.put(`${API_URLS.STUDENTS}/${id}`, student);
      if (result.error) {
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      navigate("/maintenance/student")
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
        <Input label="DPI" className="max-w-xl" value={student.dpi} name="dpi" onChange={onChange}></Input>
        <Input label="Nombre" className="max-w-xl" value={student.name} name="name" onChange={onChange}></Input>
        <Input label="Apellido" className="max-w-xl" value={student.last_name} name="last_name" onChange={onChange}></Input>
        <Input label="Correo" className="max-w-xl" value={student.email} name="email" onChange={onChange}></Input>
        <Stack direction={"row"} spacing={10} >
          <Button color="secondary" size="lg" endContent={<SaveIcon />}
            onClick={saveChange}
            isLoading={loadingUpdate}
          >
            Guardar
          </Button>
          <Button color="primary" size="lg" endContent={<ReplyIcon />}
            onClick={() => { navigate("/maintenance/student") }}
          >
            Cancelar
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
