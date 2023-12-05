import React from "react";
import { Link } from "react-router-dom";
import './style/registroEmp.css';
import MenuHamburguesa from '../MenuHamburguesa';

const RegistroEmp = () => {
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
                    <tr>
                        <td>1</td>
                        <td>Jose</td>
                        <td>Sanchez</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>María</td>
                        <td>Jimenez</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Carlos</td>
                        <td>Castro</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
};

export default RegistroEmp;