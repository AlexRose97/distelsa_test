import { useEffect, useState } from "react";
import { TablePagination } from "../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../components/templates/types";
import { Stack, Container } from "@mui/material";
import { EditAction } from "../../components/templates/EditAction";
import { DeleteAction } from "../../components/templates/DeleteAction";

import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig"; '../../services/apiConfig';
import { StudentType } from "./types";
import CustomAlert from "../../hooks/CustomAlert";
import { HeaderTable } from "../../components/templates/HeaderTable";

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
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllStudents();
  }, [])

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
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteStudent = async (id: number | string) => {
    try {
      const result = await ApiClient.delete(`${API_URLS.STUDENTS}/${id}`);
      if (result.error) {
        console.log(result)
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      getAllStudents()
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    }
    return;
  }

  const filterData = async (search: string) => {
    setLoading(true);
    try {
      const newData = students.filter((item) =>
        String(item.dpi).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.email).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.last_name).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.name).toLocaleUpperCase().includes(search.toLocaleUpperCase())
      );
      setShowStudents(formatRows(newData))//data to show
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
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
      <HeaderTable search={filterData}/>
      <TablePagination columns={columns} rows={showStudents} />
    </Container>
  )
}
