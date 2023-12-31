import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './style/registroEmp.css';
import MenuHamburguesa from '../MenuHamburguesa';

const RegistroEmp = () => {
    const [empleados, setEmpleados] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Verificar si localStorage tiene datos y asignar a userRole
    const storedUserRole = localStorage.getItem('userRole');
    console.log('Valor almacenado en localStorage:', storedUserRole);
    const userRole = storedUserRole ? JSON.parse(storedUserRole) : null;

    useEffect(() => {
        const obtenerEmpleados = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/empleados", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmpleados(data);
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                    navigate('/ventas');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerEmpleados();
    }, [navigate]);

    console.log('userRole en RegistroEmp:', userRole);
    console.log('userRole.rol en RegistroEmp:', userRole && userRole.rol);
    console.log('¿Es Jefe?', userRole && userRole.rol && userRole.rol.includes("Jefe"));

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Registro de empleados</h1>

            <div className="botones">
                <Link to="/agregarEmpleado"><button className="btn-crud">Agregar Empleado</button></Link>
                <Link to="/eliminarEmpleado"><button className="btn-crud-1">Eliminar Empleado</button></Link>
            </div>
            {userRole && userRole.rol && userRole.rol.includes("Encargado_Departamento") ? (
                <table className="registrosEmp">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>ID Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(empleado => (
                            <tr key={empleado.idEmpleado}>
                                <td>{empleado.idEmpleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellidos}</td>
                                <td>{empleado.idRol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tienes permisos para acceder a este sitio.</p>
            )}
        </div>
    );
};

export default RegistroEmp;
