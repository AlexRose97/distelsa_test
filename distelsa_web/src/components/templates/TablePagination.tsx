import { FC } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { ColumnTablePagination } from "./types";
import { statusColorMap } from "./statusColor";

interface TablePaginationProps {
    columns: ColumnTablePagination[],
    rows: any[]
}

export const TablePagination: FC<TablePaginationProps> = ({ columns, rows }) => {
    return (
        <Table>
            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
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