import React from "react";
import './style/salesReport.css';
import './style/registroEmp.css';
import MenuHamburguesa from '../MenuHamburguesa';

const SalesReportBanqueteria = () => {
    return (
        <div className='registro'>
        <MenuHamburguesa />
        <h1>Informe de Ventas Banquetería</h1>
        <h4>Ventas de la semana</h4>
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

export default SalesReportBanqueteria;