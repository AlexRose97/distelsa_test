import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../common/CustomNavbar";


export const DefaultLayot = () => {
  return (
    <Box height={"100vh"}>
      <CustomNavbar />
      <Box height={60}/>
      <Outlet />
    </Box>
  )
}
