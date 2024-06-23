import { useEffect, useState } from "react";
import { TablePagination } from "../../components/templates/TablePagination"
import { ColumnTablePaginationType } from "../../components/templates/types";
import { Stack, Container, Typography } from "@mui/material";
import { EditAction } from "../../components/templates/EditAction";

import ApiClient from '../../services/apiClient';
import API_URLS from "../../services/apiConfig"; '../../services/apiConfig';
import { LogType } from "./types";
import CustomAlert from "../../hooks/CustomAlert";
import { HeaderTable } from "../../components/templates/HeaderTable";

const columns: ColumnTablePaginationType[] = [
  { name: "TIPO", uid: "type" },
  { name: "MENSAJE", uid: "message" },
  { name: "FECHA", uid: "timestamp" },
  { name: "ESTATUS", uid: "statusCode" },
  { name: "URL", uid: "path" },
  { name: "REQUEST", uid: "params" },
];

export const HistoryLogsPage = () => {
  const [assignments, setAssignments] = useState<LogType[]>([]);
  const [showData, setShowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { errorAlert, successAlert } = CustomAlert();

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await ApiClient.get(API_URLS.LOGS);
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
        String(item.message).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.timestamp).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.course_name).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.statusCode).toLocaleUpperCase().includes(search.toLocaleUpperCase())
        || String(item.path).toLocaleUpperCase().includes(search.toLocaleUpperCase())
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

  function formatRows(data: LogType[]): any[] {
    try {
      const rows = data.map((item, i) => {
        return {
          id: i,
          type: item.type,
          message: item.message,
          timestamp: item.timestamp,
          statusCode: item.statusCode,
          path: item.path,
          params: item.params,
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
        Historial de Acciones
      </Typography>
      <HeaderTable search={filterData} url={"/assignment/add"} />
      <TablePagination columns={columns} rows={showData} />
    </Container>
  )
}
