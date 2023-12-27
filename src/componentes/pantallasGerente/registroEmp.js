import React from "react";
import { Link } from "react-router-dom";
import './style/registroEmp.css';
import MenuHamburguesa from '../MenuHamburguesa';
import { useState, useEffect } from "react";

const RegistroEmp = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        // Realizar la solicitud GET al backend cuando el componente se monta
        fetch("http://localhost:8080/api/empleados")
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los datos del backend
                setEmpleados(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // La dependencia vacía asegura que useEffect se ejecute solo una vez al montar el componente

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Registro de empleados</h1>
            <div className="botones">
                <Link to="/agregarEmpleado"><button className="btn-crud">Agregar Empleado</button></Link>
                <Link to="/eliminarEmpleado"><button className="btn-crud-1">Eliminar Empleado</button></Link>
            </div>
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
        </div>
    );
};

export default RegistroEmp;