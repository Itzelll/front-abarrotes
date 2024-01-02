import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../MenuHamburguesa';
import { Link } from 'react-router-dom';
import './style/registroEmp.css';

const InformeReportes = () => {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/reportes');
                setReportes(response.data);
            } catch (error) {
                console.error('Error al obtener los reportes:', error);
            }
        };

        fetchReportes();
    }, []);

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Reportes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CVE</th>
                        <th>Descripción</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.map((reporte) => (
                        <tr key={reporte.idReporte}>
                            <td>{reporte.idReporte}</td>
                            <td>{reporte.cve}</td>
                            <td>{reporte.descripcion}</td>
                            <td>
                                <Link to={`/detalleReporte/${reporte.idReporte}`}>Ver Detalles</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InformeReportes;
