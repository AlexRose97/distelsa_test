import { useEffect, useState } from "react";
import { TablePagination } from "../../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../../components/templates/types";
import { Stack, Container, Typography } from "@mui/material";
import { EditAction } from "../../../components/templates/EditAction";
import { DeleteAction } from "../../../components/templates/DeleteAction";

import ApiClient from '../../../services/apiClient';
import API_URLS from "../../../services/apiConfig"; '../../services/apiConfig';
import { CourseType } from "./types";
import CustomAlert from "../../../hooks/CustomAlert";
import { HeaderTable } from "../../../components/templates/HeaderTable";

const columns: ColumnTablePaginationType[] = [
  { name: "NOMBRE", uid: "name" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "CREDITOS", uid: "credits" },
  { name: "", uid: "actions" }
];

export const CoursePage = () => {
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [showData, setShowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(API_URLS.COURSES);
      if (result.error) {
        throw new Error(result.error);
      }
      setCourse(result.data);//data to filter
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
      const result = await ApiClient.delete(`${API_URLS.COURSES}/${id}`);
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
      const newData = courses.filter((item) =>
        String(item.credits).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.description).toLocaleUpperCase().includes(search.toLocaleUpperCase())
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

  function formatRows(data: CourseType[]): any[] {
    try {
      const rows = data.map((item, i) => {
        const path = `/maintenance/course/${item.id_course}`;
        const message = `¿Deseas eliminar el registro del curso: ${item.name}?`;
        return {
          id: i,
          id_course: item.id_course,
          name: item.name,
          description: item.description,
          credits: item.credits,
          actions: (
            <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
              <EditAction path={path} />
              <DeleteAction message={message} onDelete={onDeleteChange} id={item.id_course} />
            </Stack>
          )
        }
      })
      console.log(rows)
      return rows;
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return (
    <Container maxWidth="xl">
      <Typography textAlign={"center"} variant="h3" paddingBottom={5}>
        Cursos
      </Typography>
      <HeaderTable search={filterData} url={"/maintenance/course/add"} />
      <TablePagination columns={columns} rows={showData} />
    </Container>
  )
}
