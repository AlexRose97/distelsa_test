import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import studentLogo from '../../assets/student.svg'
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
export const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Mantenimientos", url: "/maintenance" },
    { name: "Asignaciones", url: "/Assignment" },
    { name: "Logs", url: "/Logs" },
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="dark text-foreground bg-background">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavbarItem>
            <NavLink
              className={({ isActive }) => { return `nav-item nav-link ${isActive ? 'active' : ''}` }}
              to="/"
            >
              <Stack direction={"row"} alignItems={"center"} >
                <img src={studentLogo} width={50} />
                <p className="font-bold text-inherit">Gestion de Alumnos</p>
              </Stack>
            </NavLink>
          </NavbarItem>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/maintenance">
            Mantenimientos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            className={({ isActive }) => { return `nav-item nav-link ${isActive ? 'active' : ''}` }}
            to="/Assignment"
          >
            Asignaciones
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <NavLink
            className={({ isActive }) => { return `nav-item nav-link ${isActive ? 'active' : ''}` }}
            to="/Logs"
          >
            Logs
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              to={item.url}
            >
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
