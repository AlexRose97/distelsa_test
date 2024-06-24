import { useEffect, useState } from "react";
import { TablePagination } from "../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../components/templates/types";
import { Stack, Container, Typography } from "@mui/material";
import { EditAction } from "../../components/templates/EditAction";

import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig"; '../../services/apiConfig';
import { AssignmentType } from "./types";
import CustomAlert from "../../hooks/CustomAlert";
import { HeaderTable } from "../../components/templates/HeaderTable";

const columns: ColumnTablePaginationType[] = [
  { name: "DPI", uid: "student_dpi" },
  { name: "ESTUDIANTE", uid: "student_name" },
  { name: "CURSO", uid: "course_name" },
  { name: "ESTATUS", uid: "status" },
  { name: "FECHA ASIGNACION", uid: "assignment_date" },
  { name: "FECHA ACTUALIZACION", uid: "update_date" },
  { name: "", uid: "actions" }
];

export const AssignmentPage = () => {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [showData, setShowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(API_URLS.ASSIGNMENTS);
      if (result.error) {
        throw new Error(result.error);
      }
      setAssignments(result.data);//data to filter
      setShowData(formatRows(result.data))//data to show
    } catch (error) {
      errorAlert({ message: String(error) })
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filterData = async (search: string) => {
    setLoading(true);
    try {
      const newData = assignments.filter((item) =>
        String(item.course_name).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.student_name).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.student_dpi).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.status).toLocaleUpperCase().includes(search.toLocaleUpperCase())
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

  function formatRows(data: AssignmentType[]): any[] {
    try {
      const rows = data.map((item, i) => {
        const path = `/assignment/${item.id_assignment}`;
        return {
          id: i,
          id_assignment: item.id_assignment,
          status: item.status,
          student_name: item.student_name,
          course_name: item.course_name,
          assignment_date: item.assignment_date,
          update_date: item.update_date,
          student_dpi: item.student_dpi,
          actions: (
            <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
              <EditAction path={path} />
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
        Asignaciones
      </Typography>
      <HeaderTable search={filterData} url={"/assignment/add"} isAddModule />
      <TablePagination columns={columns} rows={showData} />
    </Container>
  )
}
