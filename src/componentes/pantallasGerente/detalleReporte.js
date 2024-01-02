import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DetalleReporte = () => {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const response = await axios.get(`https://abarrotesapi-service-yacruz.cloud.okteto.net/api/reportes/${id}`);
        setReporte(response.data);
      } catch (error) {
        console.error(`Error al obtener el detalle del reporte con ID ${id}:`, error);
      }
    };

    fetchReporte();
  }, [id]);

  // Función para calcular el total basado en los subtotales
  const calcularTotal = () => {
    let total = 0;
    reporte.dtodetalleReporte.forEach((detalle) => {
      total += detalle.subtotal;
    });
    return total;
  };

  return (
    <div>
      <h1>Detalle del Reporte</h1>
      <Link to="/informeReportes">Volver a la lista de informes</Link>

      {reporte ? (
        <div>
          
          <p>CVE: {reporte.cve}</p>
          <p>Descripción: {reporte.descripcion}</p>
          <h3>Detalles del Reporte:</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Marca</th>
                <th>Nombre Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {reporte.dtodetalleReporte.map((detalle) => (
                <tr key={detalle.idDetalleVenta}>
                  <td>{detalle.fecha}</td>
                  <td>{detalle.marca}</td>
                  <td>{detalle.nombreProducto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precioUnitario}</td>
                  <td>{detalle.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mostrar el total calculado */}
          <p>Total: {calcularTotal()}</p>
        </div>
      ) : (
        <p>Cargando detalle del reporte...</p>
      )}
    </div>
  );
};

export default DetalleReporte;
