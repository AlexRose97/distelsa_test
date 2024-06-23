import { FC, useMemo, useState, } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Spinner, Divider } from "@nextui-org/react";
import { ColumnTablePaginationType } from "./types";
import { statusColorMap } from "./statusColor";
import { Stack, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TablePaginationProps {
    columns: ColumnTablePaginationType[],
    rows: any[]
}

export const TablePagination: FC<TablePaginationProps> = ({ columns, rows }) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const pageList = [5, 10, 20, 50, 100]
    const pages = useMemo(() => {
        return rows?.length ? Math.ceil(rows.length / rowsPerPage) : 0;
    }, [rows?.length, rowsPerPage]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [page, rows, rowsPerPage]);

    const handleChange = (event: SelectChangeEvent) => {
        setRowsPerPage(Number(event.target.value));
    };
    return (
        <Table
            color="primary"
            selectionMode="single"
            aria-label="Example table with client async pagination"
            bottomContent={
                pages > 0 ? (
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={10} paddingTop={2} borderTop={1} borderColor={"#e6e6e6"}>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                        <Select
                            value={String(rowsPerPage)}
                            label="pages"
                            onChange={handleChange}
                            variant="standard"
                        >
                            {pageList.map(i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                ) : null
            }
        >
            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={items}
                loadingContent={<Spinner />}
                emptyContent={"No se encontro informacion para mostrar"}
            >
                {(item: any) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{
                            String(columnKey).toUpperCase() !== "STATUS" ?
                                item[columnKey]
                                :
                                <Chip color={statusColorMap[`${Object.keys(statusColorMap).find((color) => color === String(item[columnKey]).toUpperCase()) || "default"}` as keyof typeof statusColorMap]} size="sm" variant="flat">
                                    {item[columnKey]}
                                </Chip>
                        }</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}