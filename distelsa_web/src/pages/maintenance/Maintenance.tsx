
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Stack, Container, Typography } from "@mui/material";
import student2IMG from '../../assets/student2.svg'
import courseIMG from '../../assets/course.svg'
import { useNavigate } from "react-router-dom";
export const Maintenance = () => {
    const navigate = useNavigate();
    return (
        <Container maxWidth="xl">
            <Typography textAlign={"center"} variant="h3" paddingBottom={5}>
                Mantenimientos
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} spacing={10}>
                <Card className="py-4" style={{ maxWidth: 400 }} isPressable
                    onPress={() => navigate("/maintenance/student")}
                >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Alumnos</h4>
                        <small className="text-default-500">{" — Creación y gestión de los alumnos."}</small>
                        <small className="text-default-500">{" — Edición, eliminación y actualización de datos de los alumnos."}</small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={student2IMG}
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4" style={{ maxWidth: 400 }} isPressable
                    onPress={() => navigate("/maintenance/course")}
                >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Cursos</h4>
                        <small className="text-default-500">{" — Creación y gestión de cursos disponibles."}</small>
                        <small className="text-default-500">{" — Edición, eliminación y actualización de datos de los cursos."}</small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={courseIMG}
                            width={270}
                        />
                    </CardBody>
                </Card>
            </Stack>
        </Container>
    )
}
