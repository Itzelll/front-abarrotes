import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../MenuHamburguesa';
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

  return (
    <div>
      <MenuHamburguesa />
      <h1>Detalle del Reporte</h1>
      <Link to="/informeVentas">Volver a la lista de informes</Link>

      {reporte ? (
        <div>
          <h2>ID: {reporte.idReporte}</h2>
          <p>CVE: {reporte.cve}</p>
          <p>Descripción: {reporte.descripcion}</p>
          <h3>Detalles del Reporte:</h3>
          <ul>
            {reporte.dtodetalleReporte.map((detalle) => (
              <li key={detalle.idDetalleVenta}>
                <p>Producto: {detalle.nombreProducto}</p>
                <p>Cantidad: {detalle.cantidad}</p>
                <p>Precio Unitario: {detalle.precioUnitario}</p>
                {/* Puedes mostrar más detalles según sea necesario */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando detalle del reporte...</p>
      )}
    </div>
  );
};

export default DetalleReporte;