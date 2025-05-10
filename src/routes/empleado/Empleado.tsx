import { NavBar } from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const navItemsEmpleado =  [
  { label: "Datos personales", icon: "fa-solid fa-user", path: "verDatos" },
  { label: "Confirmación", icon: "fa-solid fa-square-check", path: "confirmacion" },
  { label: "Datos laborales", icon: "fa-solid fa-user-tie", path: "datosLaborales" },
  { label: "Asistencias", icon: "fa-regular fa-id-card", path: "asistencias" },
  { label: "Cerrar sesión", icon: "fa-solid fa-lock", path: "confirmacion" },
];

export const Empleado = () => {
  return (
    <>
      <NavBar items={navItemsEmpleado}/>
      <main>
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </main>
    </>
  );
};
