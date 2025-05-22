import { useState, useEffect } from 'react';
import EmpleadoItem from '../../components/EmpleadoItem';
import '../../estilos/empleados.css';
import { NavLink } from "react-router-dom";
import { listarEmpleados } from '../../services/api';//conectar con la API

export interface Empleado {
  id_empleado: number;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  // Simulación de datos (temporal)
  // const empleadosSimulados: Empleado[] = Array.from({ length: 12 }, (_, i) => ({
  //   id: i + 1,
  //   nombre: `EMPLEADO ${i + 1}`,
  // }));

  useEffect(() => {
      const cargarEmpleados = async () => {
        try {         
          setEmpleados(await listarEmpleados());
          console.log(await listarEmpleados());
        } catch (error) {
          console.error('Error al cargar empleados:', error);
        }
      };
      cargarEmpleados();
    // Temporal
    // setEmpleados(empleadosSimulados);
  }, []);

   // FILTRO: busca por nombre, apellido o número de identificación
   const empleadosFiltrados = empleados.filter((emp) =>
    `${emp.nombre} ${emp.apellido} ${emp.numero_identificacion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2 className="admin-title">👥 Empleados:</h2>
      <div className="busqueda-container">
      <input
          type="text"
          placeholder="Buscar empleado por nombre, apellido o ID..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <span className="icono-busqueda">🔍</span>
      </div>
      <div className="lista-empleados">
      {empleadosFiltrados.map((empleado) => (
          <EmpleadoItem key={empleado.id_empleado} empleado={empleado} />
        ))}
        <NavLink to="/Administrador/agregarEmpleado">Agregar empleado</NavLink>
      </div>
    </div>
  );
}
