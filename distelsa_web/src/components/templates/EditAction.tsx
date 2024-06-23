
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from "@nextui-org/react";
import { FC } from 'react';
import { useNavigate } from "react-router-dom";

interface EditActionProps {
    path: string; //ruta que debe mostrar el navegador
}

export const EditAction: FC<EditActionProps> = ({ path }) => {
    const navigate = useNavigate();
    return (
        <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => navigate(path)}
            >
                <EditIcon />
            </span>
        </Tooltip>
    )
}
