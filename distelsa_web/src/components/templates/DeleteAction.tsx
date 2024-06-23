
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip } from "@nextui-org/react";
export const DeleteAction = () => {
    return (
        <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteForeverIcon />
            </span>
        </Tooltip>
    )
}
