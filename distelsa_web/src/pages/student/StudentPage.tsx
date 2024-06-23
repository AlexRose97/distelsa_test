import { useEffect, useState } from "react";
import { TablePagination } from "../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../components/templates/types";
import { Stack, Container } from "@mui/material";
import { EditAction } from "../../components/templates/EditAction";
import { DeleteAction } from "../../components/templates/DeleteAction";
import { Button, Input } from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';

import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig"; '../../services/apiConfig';
import { StudentType } from "./types";

const columns: ColumnTablePaginationType[] = [
  { name: "DPI", uid: "dpi" },
  { name: "NOMBRE", uid: "name" },
  { name: "APELLIDO", uid: "last_name" },
  { name: "CORREO", uid: "email" },
  { name: "", uid: "actions" }
];



export const StudentPage = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [showStudents, setShowStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    getAllStudents();
  }, [refresh])

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(API_URLS.STUDENTS);
      if (result.error) {
        throw new Error(result.error);
      }
      setStudents(result.data);//data to filter
      setShowStudents(formatRows(result.data))//data to show
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  }

  const deleteStudent = async (id: number | string) => {
    setLoading(true);
    try {
      const result = await ApiClient.delete(`${API_URLS.STUDENTS}/${id}`);
      if (result.error) {
        throw new Error(result.error);
      }
      setStudents(result.data);//data to filter
      setShowStudents(formatRows(result.data))//data to show
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
    return;
  }

  function formatRows(data: StudentType[]): any[] {
    try {
      const rows = data.map((item) => {
        const path = `/student/${item.id_student}`;
        const message = `¿Deseas eliminar el registro del estudiante con DPI:${item.dpi}?`;
        return {
          id: item.id_student,
          dpi: item.dpi,
          name: item.name,
          last_name: item.last_name,
          email: item.email,
          actions: (
            <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
              <EditAction path={path} />
              <DeleteAction message={message} onDelete={deleteStudent} id={item.id_student} />
            </Stack>
          )
        }
      })
      return rows;
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return (
    <Container maxWidth="xl">
      <Stack direction={"row"} spacing={10} justifyContent={"center"} alignItems={"center"}>
        <Input label="Buscar" className="max-w-xl"></Input>
        <Button color="primary" size="lg" >
          Button
        </Button>
      </Stack>
      <Stack direction={"row"} justifyContent={"end"} padding={2}>
        <Button color="secondary" size="lg" endContent={<AddIcon />} >
          Agregar
        </Button>
      </Stack>
      <TablePagination columns={columns} rows={showStudents} />
    </Container>
  )
}
