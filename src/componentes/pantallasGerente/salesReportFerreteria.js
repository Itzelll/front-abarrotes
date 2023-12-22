import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';
import MenuHamburguesa from '../MenuHamburguesa';

const SalesReportFerreteriaPDF = () => (
  <Document>
    <Page size="A4">
      <View>
        <Text>ID</Text>
        <Text>Producto</Text>
        <Text>Cantidad</Text>
        <Text>Precio Unitario</Text>
        <Text>Total</Text>
      </View>
      {/* Data for the sales report (you can replace this with dynamic data) */}
      <View>
        <Text>1</Text>
        <Text>Empanada</Text>
        <Text>2</Text>
        <Text>1000</Text>
        <Text>2000</Text>
      </View>
      <View>
        <Text>2</Text>
        <Text>Completo</Text>
        <Text>1</Text>
        <Text>1500</Text>
        <Text>1500</Text>
      </View>
      <View>
        <Text>3</Text>
        <Text>Chorrillana</Text>
        <Text>1</Text>
        <Text>5000</Text>
        <Text>5000</Text>
      </View>
    </Page>
  </Document>
);

const SalesReportFerreteria = () => {
  return (
    <div className='registro'>
      <MenuHamburguesa />
      <h1>Informe de Ventas Ferreteria</h1>
      <h4>Ventas de la semana</h4>
      <PDFDownloadLink document={<SalesReportFerreteriaPDF />} fileName="sales_report_ferreteria.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
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
          {/* Static data for the sales report (replace with dynamic data) */}
          <tr>
            <td>1</td>
            <td>Empanada</td>
            <td>2</td>
            <td>1000</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Completo</td>
            <td>1</td>
            <td>1500</td>
            <td>1500</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Chorrillana</td>
            <td>1</td>
            <td>5000</td>
            <td>5000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesReportFerreteria;
