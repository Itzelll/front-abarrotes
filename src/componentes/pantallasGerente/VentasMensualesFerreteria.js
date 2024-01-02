import React from "react";
import MenuHamburguesa from '../MenuHamburguesa';
import { Link } from 'react-router-dom';

const VentasMensualesFerreteria = () => {
    // Verificar si localStorage tiene datos y asignar a userRole
    const storedUserRole = localStorage.getItem('userRole');
    console.log('Valor almacenado en localStorage:', storedUserRole);
    const userRole = storedUserRole ? JSON.parse(storedUserRole) : null;

    console.log('userRole en RegistroEmp:', userRole);
    console.log('userRole.rol en RegistroEmp:', userRole && userRole.rol);


    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Ventas Mesuales Ferrtería</h1>

            <div className="btn-ventas">
                <Link to="/salesReportFerreteria"><button className='ventas-mensuales'>Ventas Semanales</button></Link>
            </div>
            <br />
            {userRole && userRole.rol && userRole.rol.includes("Encargado_Departamento") ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No tienes permisos para acceder a este sitio.</p>
            )}
        </div>
    )
}

export default VentasMensualesFerreteria;