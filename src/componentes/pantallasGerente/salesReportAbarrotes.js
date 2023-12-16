import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MenuHamburguesa from '../MenuHamburguesa';
import { SalesReportAbarrotesPDF } from './styleAbarrotesPDF';

const SalesReportAbarrotes = () => {
  const [salesData, setSalesData] = useState([]);
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch sales data
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint to fetch sales data
        const response = await fetch('/api/salesReportAbarrotes');
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const updatedSalesData = salesData.filter((sale) => sale.id !== id);
    setSalesData(updatedSalesData);
  };

  const handleEdit = (id) => {
    // Buscar el elemento que se está editando
    const saleToEdit = salesData.find((sale) => sale.id === id);
    // Establecer el elemento que se está editando en el estado
    setEditingSale(saleToEdit);

    console.log(`Editar elemento con ID ${id}`);
  };


  return (
    <div className='registro'>
      <MenuHamburguesa />
      <h1>Informe de Ventas Abarrotes</h1>
      <h4>Ventas de la semana</h4>
      <PDFDownloadLink document={<SalesReportAbarrotesPDF salesData={salesData} />}
        fileName="sales_report_abarrotes.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
      {/* <table style={{ width: '90%', marginTop: '10px', borderCollapse: 'collapse' }}> */}
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
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.producto}</td>
              <td>{sale.cantidad}</td>
              <td>{sale.precioUnitario}</td>
              <td>{sale.cantidad * sale.precioUnitario}</td>
              <td>
                <button onClick={() => handleEdit(sale.id)}>Editar</button>
              </td>

              <td>
                <button onClick={() => handleDelete(sale.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReportAbarrotes;
