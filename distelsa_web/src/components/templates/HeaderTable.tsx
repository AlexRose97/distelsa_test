import { useState, ChangeEvent } from "react";
import { Button, Input } from "@nextui-org/react";
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HeaderTableProps {
    search: (search: string) => Promise<void>;
    url: string;//url para mostra la pagina add
}

export const HeaderTable: React.FC<HeaderTableProps> = ({ search, url }) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>("")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: { value, name } } = e;
        setSearchValue(value)
        search(value);
    }


    return (
        <>
            <Stack direction={"row"} spacing={10} justifyContent={"center"} alignItems={"center"}>
                <Input label="Buscar" className="max-w-xl" value={searchValue} name="search" onChange={onChange}></Input>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"} padding={2}>
                <Button color="secondary" size="lg" endContent={<AddIcon />}
                    onClick={() => { navigate(url)}}>
                    Agregar
                </Button>
            </Stack>
        </>
    )
}
