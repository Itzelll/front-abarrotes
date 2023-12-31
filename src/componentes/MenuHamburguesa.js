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
                    <li className='titulo'>Pedidos</li>
                    <Link to='/pedidos' className='no-underline'><li className='opc'>Crear Pedidos</li></Link>
                    <Link to='/pedidoProceso' className='no-underline'><li className='opc'>Estado Pedidos</li></Link>
                    <Link to='/pedidoCancelado' className='no-underline'><li className='opc'>Pedidos Cancelados</li></Link>
                    <Link to='/pedidoEntregado' className='no-underline'><li className='opc'>Pedidos Entregados</li></Link>

                    <Link to='/registroEmpleado' className='no-underline'><li className='titulo'>ResgitrarEmpleado</li></Link>
                    <li className='titulo'>Informe de Ventas</li>
                    <Link to='/salesReportAbarrotes' className='no-underline'><li className='opc'>Abarrotes</li></Link>
                    <Link to='/salesReportFerreteria' className='no-underline'><li className='opc'>Ferretería</li></Link>                    
                    <Link to='/salesReportBanqueteria' className='no-underline'><li className='opc'>Banquetería</li></Link>

                    <li className='titulo'>Notas</li>
                    <Link to='/notasPendientes' className='no-underline'><li className='opc'>Pendientes</li></Link>
                    <Link to='/notasPagadas' className='no-underline'><li className='opc'>Pagadas</li></Link>
                    <Link to='/notasCanceladas' className='no-underline'><li className='opc'>Canceladas</li></Link>                    

                    <li className='titulo'>Productos</li>
                    <Link to='/catalogo' className='no-underline'><li className='opc'>Catalogo</li></Link>
                    <Link to='/agregarProducto' className='no-underline'><li className='opc'>Agregar nuevo</li></Link>
                    <li className='titulo'>Otros</li>
                    <Link to='/marcas' className='no-underline'><li className='opc'>Listado marcas</li></Link>
                    <Link to='/categoria' className='no-underline'><li className='opc'>Categoria</li></Link>
                    <Link to='/unidadMedida' className='no-underline'><li className='opc'>Unidad medida</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default MenuHamburguesa;