import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../MenuHamburguesa';
import { Link } from 'react-router-dom';

const InformeVentas = () => {
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
        <div>
            <MenuHamburguesa />
            <h1>Informe de Ventas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CVE</th>
                        <th>Descripción</th>
                        <th></th>
                        <th>Detalles del Reporte</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.map((reporte) => (
                        <tr key={reporte.idReporte}>
                            <td>{reporte.idReporte}</td>
                            <td>{reporte.cve}</td>
                            <td>{reporte.descripcion}</td>
                            <td>
                                <ul>
                                    {reporte.dtodetalleReporte.map((detalle) => (
                                        <li key={detalle.idDetalleVenta}>
                                            <p>Cantidad: {detalle.cantidad}</p>
                                            <p>Fecha: {detalle.fecha}</p>
                                            <p>Marca: {detalle.marca}</p>
                                            <p>Producto: {detalle.nombreProducto}</p>
                                            <p>Precio Unitario: {detalle.precioUnitario}</p>
                                            <p>Subtotal: {detalle.subtotal}</p>
                                            <p>Precio Unitario: {detalle.total}</p>

                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Link to={`/detalleVentas/${reporte.idReporte}`}>Ver Detalles</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InformeVentas;
