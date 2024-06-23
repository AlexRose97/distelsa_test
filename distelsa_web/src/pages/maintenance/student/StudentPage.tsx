import { useEffect, useState } from "react";
import { TablePagination } from "../../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../../components/templates/types";
import { Stack, Container, Typography } from "@mui/material";
import { EditAction } from "../../../components/templates/EditAction";
import { DeleteAction } from "../../../components/templates/DeleteAction";

import ApiClient from '../../../services/apiClient';
import API_URLS from "../../../services/apiConfig"; '../../services/apiConfig';
import { StudentType } from "./types";
import CustomAlert from "../../../hooks/CustomAlert";
import { HeaderTable } from "../../../components/templates/HeaderTable";

const columns: ColumnTablePaginationType[] = [
  { name: "DPI", uid: "dpi" },
  { name: "NOMBRE", uid: "name" },
  { name: "APELLIDO", uid: "last_name" },
  { name: "CORREO", uid: "email" },
  { name: "", uid: "actions" }
];

export const StudentPage = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [showData, setShowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(API_URLS.STUDENTS);
      if (result.error) {
        throw new Error(result.error);
      }
      setStudents(result.data);//data to filter
      setShowData(formatRows(result.data))//data to show
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onDeleteChange = async (id: number | string) => {
    try {
      const result = await ApiClient.delete(`${API_URLS.STUDENTS}/${id}`);
      if (result.error) {
        console.log(result)
        throw new Error(result.error);
      }
      successAlert({ message: result.message })
      getAllData()
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
      setShowData(formatRows(newData))//data to show
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
      const rows = data.map((item, i) => {
        const path = `/maintenance/student/${item.id_student}`;
        const message = `¿Deseas eliminar el registro del estudiante con DPI:${item.dpi}?`;
        return {
          id: i,
          id_student: item.id_student,
          dpi: item.dpi,
          name: item.name,
          last_name: item.last_name,
          email: item.email,
          actions: (
            <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
              <EditAction path={path} />
              <DeleteAction message={message} onDelete={onDeleteChange} id={item.id_student} />
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
      <Typography textAlign={"center"} variant="h3" paddingBottom={5}>
        Estudiantes
      </Typography>
      <HeaderTable search={filterData} url={"/maintenance/student/add"} />
      <TablePagination columns={columns} rows={showData} />
    </Container>
  )
}
