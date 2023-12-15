import React from "react";
import './style/salesReport.css';
import './style/registroEmp.css';
import { Link } from 'react-router-dom';
import MenuHamburguesa from '../MenuHamburguesa';

const SalesReportBanqueteria = () => {
    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Informe de Ventas Banquetería</h1>
            <div className='btn-ventas'>
                <Link to='/ventasMensualesBanqueteria'><button className='ventas-mensuales'>Ventas mensuales</button></Link>
            </div>
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
                    <tr>
                        <td>1</td>
                        <td>Sillas</td>
                        <td>100</td>
                        <td>10</td>
                        <td>1000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesReportBanqueteria;