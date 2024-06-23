import { Container, Typography, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import student2IMG from '../../assets/student2.svg'
import courseIMG from '../../assets/course.svg'
import assignmentIMG from '../../assets/assignment.svg'
import historyIMG from '../../assets/history.svg'
export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <br />
      <br />
      <Typography>
        Bienvenido/a a nuestra plataforma administrativa para la gestión académica. Esta aplicación está diseñada para ofrecer un conjunto completo de herramientas que facilitan el manejo eficiente y detallado de estudiantes, cursos y sus respectivas asignaciones.
      </Typography>
      <br />
      <Typography>
        A continuación, destacamos las principales funcionalidades que nuestra plataforma ofrece:
      </Typography>
      <br />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItemButton alignItems="flex-start"
          onClick={() => navigate("/student")}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={student2IMG} />
          </ListItemAvatar>
          <ListItemText
            primary="Mantenimiento de Alumnos"
            secondary={
              <>
                {" — Creación y gestión de los alumnos."}
                <br />
                {" — Edición, eliminación y actualización de datos de los alumnos."}
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start"
          onClick={() => navigate("/course", { replace: false })}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={courseIMG} />
          </ListItemAvatar>
          <ListItemText
            primary="Mantenimiento de Cursos"
            secondary={
              <>
                {" — Creación y gestión de cursos disponibles."}
                <br />
                {" — Edición, eliminación y actualización de datos de los cursos."}
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start"
          onClick={() => navigate("/assignment", { replace: false })}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={assignmentIMG} />
          </ListItemAvatar>
          <ListItemText
            primary="Asignacion de cursos"
            secondary={
              <>
                {" — Asignación de cursos a alumnos"}
                <br />
                {" — Visualización de cursos asignados por alumnos"}
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start"
          onClick={() => navigate("/history", { replace: false })}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={historyIMG} />
          </ListItemAvatar>
          <ListItemText
            primary="Registro de Logs"
            secondary={
              <>
                {" — Registro cronológico y detallado de todos los cambios y eventos relacionados con las asignaciones de cursos."}
              </>
            }
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
      </List>
    </Container>
  )
}


