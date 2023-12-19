import React from "react";
import MenuHamburguesa from '../MenuHamburguesa';
import { Link } from 'react-router-dom';
import { CgAdd } from "react-icons/cg";
import '../pantallasGerente/style/notaGastos.css';

const CrearNota = () => {
    return (
        <div className="registro">
            <MenuHamburguesa />
            <div className="title">
                <h1 className="titulo">Crear Nota de Gastos</h1>
                <div className="icono-mas">
                    <Link to='/notaNuevaGastos' className='no-underline'><CgAdd /></Link>
                </div>
            </div>
            <h4>Notas</h4>
            <table className="notas">
                <thead>
                    <tr>
                        <th>No. de Nota</th>
                        <th>Fecha</th>
                        <th>Cantidad $</th>
                        <th>Motivo</th>
                        <th>Información Extra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>12/12/2023</td>
                        <td>1000</td>
                        <td>Comida</td>
                        <td>Comida para el personal</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CrearNota;