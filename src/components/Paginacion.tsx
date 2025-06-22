import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import "./estilos/empleado-item.css";
import { useUser } from "../context/UserContext";

type Item = {
  id_empleado: number;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  imagen_perfil_url?: string;
};

type Props = {
  items: Item[];
  itemsPerPage?: number;
};

const Paginacion: React.FC<Props> = ({ items, itemsPerPage = 5 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState<string>("1");

  const { usuario } = useUser();

  // Filtra los elementos según el término de búsqueda
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numero_identificacion
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //    setSearchTerm(e.target.value);
  //    setCurrentPage(1);
  //  };

  // Actualiza el input mientras el usuario escribe
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Permitir solo dígitos vacíos o numéricos
    if (/^\d*$/.test(val)) {
      setInputPage(val);
    }
  };

  // Cuando el usuario termina de editar (blur o Enter), validar y navegar
  const commitInputPage = () => {
    const pageNum = parseInt(inputPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      // Si no es válido, resetear el input a la página actual
      setInputPage(String(currentPage));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitInputPage();
    }
  };

  const handleInputBlur = () => {
    commitInputPage();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página en nueva búsqueda
  };

  return (
    <div>
      <div className="busqueda-container">
        <input
          type="text"
          placeholder="Buscar empleado por nombre, apellido o ID..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "1rem", padding: "4px" }}
        />
        <span className="icono-busqueda">🔍</span>
      </div>

      <ul className="empleado-items">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div className="empleado-item" key={item.id_empleado}>
              <span className="icono-perfil">
                {item.imagen_perfil_url ? (
                  <img src={item.imagen_perfil_url} alt="" width="50px" />
                ) : (
                  <span className="icono-perfil">👤</span>
                )}
              </span>
              <span className="empleado-nombre">
                {item.nombre} {item.apellido}
              </span>
              {usuario?.permisos.editar_datos_personales &&
                (usuario.rol == "3" || usuario.rol == "4") && (
                  <NavLink
                    className={"link"}
                    to={`/supervisor/reportes/${item.id_empleado}`} // Cambia esta línea
                  >
                    Ver Reportes
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                (usuario.rol == "3" || usuario.rol == "4") && (
                  <NavLink className={"link"} to="/supervisor/ver-nomina">
                    Ver nomina
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                usuario.rol == "2" && ( // verifica si el usuario tiene permiso para editar datos personales de los empleados
                  <NavLink
                    className={"link"}
                    to="/administrador/empleados/editarEmpleado"
                    state={item}
                  >
                    Editar
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                usuario.rol == "2" && (
                  <NavLink
                    className={"link"}
                    to="/administrador/editarDatosLaborales"
                  >
                    Agregar datos laborales
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                usuario.rol == "2" && (
                  <NavLink
                    className="link"
                    to={`/administrador/empleados/${item.id_empleado}/agregar-jornada`}
                  >
                    Agregar jornada
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                usuario.rol == "2" && (
                  <NavLink
                    className="link"
                    to={`/administrador/empleados/${item.id_empleado}/inasistencia`}
                  >
                    Agregar inasistencia
                  </NavLink>
                )}
              {usuario?.permisos.editar_datos_personales &&
                usuario.rol == "2" && (
                  <NavLink
                    className="link"
                    to={`/administrador/empleados/${item.id_empleado}/asistenciaUnica`}
                  >
                    Agregar asistencia unica
                  </NavLink>
                )}
            </div>
          ))
        ) : (
          <li>No se encontraron resultados.</li>
        )}
      </ul>

      <div className="nav-paginas" style={{ marginTop: "1rem" }}>
        <button
          className="btn-ant-pag"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>Página</span>

        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          style={{
            width: "2.5em",
            textAlign: "center",
            padding: "2px",
          }}
        />

        <span>de {totalPages}</span>

        <button
          className="btn-sig-pag"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Paginacion;
