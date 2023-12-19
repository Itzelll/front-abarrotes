import React from "react";
import MenuHamburguesa from '../MenuHamburguesa';
import { Link } from 'react-router-dom';

const VentasMensualesFerreteria = () => {
    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Ventas Mesuales Ferrtería</h1>

            <div className="btn-ventas">
                <Link to="/salesReportFerreteria"><button className='ventas-mensuales'>Ventas Semanales</button></Link>
            </div>
            <br />
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
        </div>
    )
}

export default VentasMensualesFerreteria;