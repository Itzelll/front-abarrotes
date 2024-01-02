import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

const API_URL = 'https://abarrotesapi-service-yacruz.cloud.okteto.net';

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [nombreBusqueda, setNombreBusqueda] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [errorBusqueda, setErrorBusqueda] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/productos`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos', error);
            }
        };

        fetchProductos();
    }, []);

    const handleBuscarProducto = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/productos/buscar?nombre=${nombreBusqueda.toLowerCase()}`);
            setProductosEncontrados(response.data);
            setErrorBusqueda(null);
        } catch (error) {
            console.error('Error al buscar producto', error);
            setProductosEncontrados([]);
            setErrorBusqueda('Productos no encontrados');
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
                    onChange={(e) => setNombreBusqueda(e.target.value.toLowerCase())}
                />
                <div className='botones'>
                    <button onClick={handleBuscarProducto} className='btn-finalizar'>Buscar</button>
                </div>
                {errorBusqueda && <p className='error-message'>{errorBusqueda}</p>}
                {productosEncontrados.length > 0 && (
                    <div>
                        <h3>Productos Encontrados:</h3>
                        <table className='registroEmp'>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Existencia</th>
                                    <th>Precio</th>
                                    <th>Categoría</th>
                                    <th>Marca</th>
                                    <th>Unidad de Medida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosEncontrados.map((producto) => (
                                    <tr key={producto.codigo}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.existencia}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.marca}</td>
                                        <td>{producto.unidadMedida}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>                        
                    </div>
                )}
            </div>

            <h2 className='titulos'>Catálogo de Productos</h2>
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
                        <tr key={producto.codigo}>
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
