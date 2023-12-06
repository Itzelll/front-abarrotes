import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuHamburguesa.css';

const MenuHamburguesa = ({ items, activeIndex, onItemClick }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className={`menu-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} id="menuHam">
                <div className="btn-line"></div>
                <div className="btn-line"></div>
                <div className="btn-line"></div>
            </div>

            <div className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul className='opciones'>
                    <Link to='/ventas' className='no-underline'><li className='titulo'>Ventas</li></Link>
                    <Link to='/registroEmpleado' className='no-underline'><li className='titulo'>Registro de empleados</li></Link>
                    <li className='titulo'>Informe de Ventas</li>
                    <Link to='/salesReportAbarrotes' className='no-underline'><li className='opc'>Abarrotes</li></Link>
                    <Link to='/salesReportFerreteria' className='no-underline'><li className='opc'>Ferrtería</li></Link>
                    <Link to='/salesReportBanqueteria' className='no-underline'><li className='opc'>Banquetería</li></Link> 
                    
                    <Link to='/crearNota' className='no-underline'><li className='titulo'>Crear nota de gastos</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default MenuHamburguesa;