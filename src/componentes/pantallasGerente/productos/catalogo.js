// Catalogo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from './MenuHamburguesa';
import './styles/catalogo.css';

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

        <div>
            <MenuHamburguesa />
            <div>
                <h2>Buscar Producto por Nombre</h2>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    value={nombreBusqueda}
                    onChange={(e) => setnombreBusqueda(e.target.value)}
                />
                <button onClick={handleBuscarProducto}>Buscar</button>
                {productoEncontrado && (
                    <div>
                        <h3>Producto Encontrado:</h3>
                        <p>Código: {productoEncontrado.codigo}</p>
                        <p>Nombre: {productoEncontrado.nombre}</p>
                        {/* Puedes mostrar más detalles según tus necesidades */}
                    </div>
                )}
            </div>

            <h2>Catalogo de Productos</h2>
            <table>
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
