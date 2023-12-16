// Catalogo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [nombreBusqueda, setnombreBusqueda] = useState('');
    const [productoEncontrado, setProductoEncontrado] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos', error);
            }
        };

        fetchProductos();
    }, []);

    const handleBuscarProducto = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/productos/buscar?nombre=${nombreBusqueda}`);
            setProductoEncontrado(response.data[0]);
        } catch (error) {
            console.error('Error al buscar producto', error);
            setProductoEncontrado(null);
        }
    };

    return (

        <div className='registro'>
            <MenuHamburguesa />
            <div className='btns'>
                <h1 className='titulos'>Buscar Producto por Nombre</h1>
                <input
                    className='input-producto'
                    type="text"
                    placeholder="Nombre del Producto"
                    value={nombreBusqueda}
                    onChange={(e) => setnombreBusqueda(e.target.value)}
                />
                <div className='botones'>
                    <button onClick={handleBuscarProducto} className='btn-finalizar'>Buscar</button>
                </div>
                {productoEncontrado && (
                    <div>
                        <h3>Producto Encontrado:</h3>
                        <p>Código: {productoEncontrado.codigo}</p>
                        <p>Nombre: {productoEncontrado.nombre}</p>
                        {/* Puedes mostrar más detalles según tus necesidades */}
                    </div>
                )}
            </div>

            <h2 className='titulos'>Catalogo de Productos</h2>
            <table className='registroEmp'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Existencia</th>
                        <th>Categoría</th>
                        <th>Marca</th>
                        <th>Unidad de Medida</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.existencia}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.unidadMedida}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Catalogo;
