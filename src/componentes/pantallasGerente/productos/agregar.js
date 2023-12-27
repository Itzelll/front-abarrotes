// CreateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';
import '../style/registroEmp.css';

const CreateProduct = () => {
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setExistencia] = useState('');
    const [precio, setPrecio] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [marcas, setMarcas] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [unidadMedidas, setUnidadMedidas] = useState([]);
    const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    const handleCreate = async () => {
        try {
            const nuevoProducto = {
                codigo: parseInt(codigo),
                nombre: nombre.toLowerCase(),
                existencia: parseInt(existencia),
                precio: parseFloat(precio),
                categoria: {
                    idCategoria: parseInt(categoriaSeleccionada)
                },
                marca: {
                    idMarca: parseInt(marcaSeleccionada)
                },
                unidadMedida: {
                    idUnidadMed: parseInt(unidadMedidaSeleccionada)
                },
            };

            const response = await axios.post('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/productos', nuevoProducto);
            console.log('Producto creado:', response.data);
            alert('Producto creado con éxito.');
            fetchProductos();
            resetForm();
        } catch (error) {
            console.error('Error al crear producto', error);
        }
    };

    const handleEdit = async (codigo) => {
        console.log('Editar producto con código:', codigo);
        const productoAEditar = productos.find((producto) => producto.codigo === codigo);
        if (productoAEditar) {
            setProductoSeleccionado(productoAEditar);
            setCodigo(productoAEditar.codigo.toString());
            setNombre(productoAEditar.nombre);
            setExistencia(productoAEditar.existencia.toString());
            setPrecio(productoAEditar.precio.toString());
    
            // Obtener los objetos completos de las listas usando los IDs del producto
            const categoriaSeleccionadaObj = categorias.find((categoria) => categoria.idCategoria === productoAEditar.categoria);
            const marcaSeleccionadaObj = marcas.find((marca) => marca.idMarca === productoAEditar.marca);
            const unidadMedidaSeleccionadaObj = unidadMedidas.find((unidadMedida) => unidadMedida.idUnidadMed === productoAEditar.unidadMedida);
    
            // Configurar los estados con los objetos completos
            setCategoriaSeleccionada(categoriaSeleccionadaObj ? categoriaSeleccionadaObj.idCategoria.toString() : '');
            setMarcaSeleccionada(marcaSeleccionadaObj ? marcaSeleccionadaObj.idMarca.toString() : '');
            setUnidadMedidaSeleccionada(unidadMedidaSeleccionadaObj ? unidadMedidaSeleccionadaObj.idUnidadMed.toString() : '');
    
            setModoEdicion(true);
        } else {
            console.error(`No se encontró el producto con código: ${codigo}`);
        }
    };    

    const handleUpdate = async () => {
        console.log('productoSeleccionado:', productoSeleccionado);
        try {
            const productoActualizado = {
                codigo: parseInt(codigo),
                nombre: nombre.toLowerCase(),
                existencia: parseInt(existencia),
                precio: parseFloat(precio),
                categoria: {
                    idCategoria: parseInt(categoriaSeleccionada)
                },
                marca: {
                    idMarca: parseInt(marcaSeleccionada)
                },
                unidadMedida: {
                    idUnidadMed: parseInt(unidadMedidaSeleccionada)
                },
            };

            const response = await axios.put(
                `https://abarrotesapi-service-yacruz.cloud.okteto.net/api/productos/${productoSeleccionado.codigo}`,
                productoActualizado
            );
            console.log('Producto actualizado:', response.data);
            alert('Producto actualizado con éxito.');
            setModoEdicion(false);
            fetchProductos();
            resetForm();
        } catch (error) {
            console.error('Error al actualizar producto', error);
        }
    };

    const resetForm = () => {
        setCodigo('');
        setNombre('');
        setExistencia('');
        setPrecio('');
        setCategoriaSeleccionada('');
        setMarcaSeleccionada('');
        setUnidadMedidaSeleccionada('');
    };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/productos');
            // console.log('Productos obtenidos:', response.data);
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/marcas');
                setMarcas(response.data);
            } catch (error) {
                console.error('Error al obtener marcas', error);
            }
        };

        fetchMarcas();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchUnidadMedidas = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/unidadesMedida');
                setUnidadMedidas(response.data);
            } catch (error) {
                console.error('Error al obtener unidades de medida', error);
            }
        };

        fetchUnidadMedidas();
    }, []);

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Crear Producto</h1>
            <div>
                <h4>{modoEdicion ? 'Editar' : 'Agregar'} Producto</h4>
                <input
                    className='input-producto'
                    type="number"
                    placeholder="Código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <input
                    className='input-producto'
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value.toLowerCase())}
                />
                <input
                    className='input-producto'
                    type="number"
                    placeholder="Existencia"
                    value={existencia}
                    onChange={(e) => setExistencia(e.target.value)}
                />
                <input
                    className='input-producto'
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <select
                    className='select-producto'
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className='select-producto'
                    value={marcaSeleccionada}
                    onChange={(e) => setMarcaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona una marca</option>
                    {marcas.map((marca) => (
                        <option key={marca.idMarca} value={marca.idMarca}>
                            {marca.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className='select-producto'
                    value={unidadMedidaSeleccionada}
                    onChange={(e) => setUnidadMedidaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona una unidad de medida</option>
                    {unidadMedidas.map((unidadMedida) => (
                        <option key={unidadMedida.idUnidadMedida} value={unidadMedida.idUnidadMedida}>
                            {unidadMedida.nombre}
                        </option>
                    ))}
                </select>
                <div className='botones'>
                    {modoEdicion ? (
                        <button className='btn-finalizar' onClick={handleUpdate}>Actualizar</button>
                    ) : (
                        <button className='btn-finalizar' onClick={handleCreate}>Crear</button>
                    )}
                </div>
            </div>
            <h4>Lista de Productos</h4>
            <table className="registroEmp">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Existencia</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Marca</th>
                        <th>Unidad de Medida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        // console.log(producto),
                        <tr key={producto.codigo}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.existencia}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.unidadMedida}</td>
                            <td className='btn-ventas'>
                                <div className='botones'>
                                    <button className='btn-finalizar' onClick={() => handleEdit(producto.codigo)}>Editar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateProduct;
