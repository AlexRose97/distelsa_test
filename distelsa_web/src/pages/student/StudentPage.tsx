import { TablePagination } from "../../components/templates/TablePagination"
import { ColumnTablePagination } from "../../components/templates/types";
import { Stack, Container } from "@mui/material";
import { EditAction } from "../../components/templates/EditAction";
import { DeleteAction } from "../../components/templates/DeleteAction";
import { Button, Input } from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';
export const StudentPage = () => {
  const columns: ColumnTablePagination[] = [
    { name: "DPI", uid: "dpi" },
    { name: "NOMBRE", uid: "name" },
    { name: "APELLIDO", uid: "last_name" },
    { name: "CORREO", uid: "email" },
    { name: "", uid: "actions" }
  ];

  const rows = [
    {
      id: 1,
      dpi: "12364569785213",
      name: "CEO",
      last_name: "ANULADO",
      email: "data@data.com",
      actions: (
        <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
          <EditAction path={`/student/${2}`} />
          <DeleteAction />
        </Stack>
      )
    },
    {
      id: 2,
      dpi: "12364569785213",
      name: "Technical Lead",
      last_name: "RECHAZADO",
      email: "data@data.com",
      actions: (
        <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
          <EditAction path={`/student/${2}`} />
          <DeleteAction />
        </Stack>
      )
    },
    {
      id: 3,
      dpi: "12364569785213",
      name: "Senior Developer",
      last_name: "active",
      email: "data@data.com",
      actions: (
        <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
          <EditAction path={`/student/${2}`} />
          <DeleteAction />
        </Stack>
      )
    },
    {
      id: 4,
      dpi: "12364569785213",
      name: "Community Manager",
      last_name: "PENDIENTE",
      email: "data@data.com",
      actions: (
        <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
          <EditAction path={`/student/${2}`} />
          <DeleteAction />
        </Stack>
      )
    },
    {
      id: 5,
      dpi: "12364569785213",
      name: "Sales Manager",
      last_name: "APROBADO",
      email: "data@data.com",
      actions: (
        <Stack direction={"row"} alignContent={"space-around"} justifyContent={"center"} spacing={2}>
          <EditAction path={`/student/${2}`} />
          <DeleteAction />
        </Stack>
      )
    },
  ];

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
      <TablePagination columns={columns} rows={rows} />
    </Container>
  )
}
