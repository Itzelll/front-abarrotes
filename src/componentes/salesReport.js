import React, { useState, useEffect } from 'react';
import './salesReport.css';

const SalesReport = () => {
  // Estado para almacenar los datos de ventas
  const [salesData, setSalesData] = useState([]);

  // Simulación de carga de datos de ventas (puedes cambiar esto con una llamada a la API real)
  useEffect(() => {
    // Lógica para obtener los datos de ventas
    const fetchData = async () => {
      try {
        // Llamada a la API para obtener datos de ventas
        const response = await fetch('/api/salesReport');
        const data = await response.json();

        // Actualizar el estado con los datos de ventas
        setSalesData(data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    // Llamar a la función para obtener datos al montar el componente
    fetchData();
  }, []);

  return (
    <div>
      <h1>Reporte de Ventas</h1>
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
          {/* Iterar sobre los datos de ventas y mostrar cada fila */}
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.producto}</td>
              <td>{sale.cantidad}</td>
              <td>{sale.precioUnitario}</td>
              <td>{sale.cantidad * sale.precioUnitario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
