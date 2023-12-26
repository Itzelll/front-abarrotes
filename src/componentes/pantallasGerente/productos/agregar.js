// CreateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import UnidadMedidaList from './unidadMedida';
import '../style/catalogo.css';
import '../style/salesReport.css';
import '../style/registroEmp.css';

const CreateProduct = () => {
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setExistencia] = useState('');
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
                codigo,
                nombre: nombre.toLowerCase(),
                existencia,
                categoria: categoriaSeleccionada.idCategoria,
                marca: marcaSeleccionada.idMarca,
                unidadMedida: unidadMedidaSeleccionada.idUnidadMedida,
            };

            const response = await axios.post('http://localhost:8080/api/productos', nuevoProducto);
            console.log('Producto creado:', response.data);
            setCodigo('');
            setNombre('');
            setExistencia('');
            setCategoriaSeleccionada('');
            setMarcaSeleccionada('');
            setUnidadMedidaSeleccionada('');
            fetchProductos();
            // setProductos([...productos, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al crear producto', error);
        }
    };

    const handleEdit = (codigo) => {
        console.log('Editar producto con código:', codigo);
        const productoAEditar = productos.find((producto) => producto.codigo === codigo);
        if (productoAEditar) {
            setProductoSeleccionado(productoAEditar);
            setCodigo(productoAEditar.codigo);
            setNombre(productoAEditar.nombre);
            setExistencia(productoAEditar.existencia);
            setCategoriaSeleccionada(productoAEditar.categoria);
            setMarcaSeleccionada(productoAEditar.marca);
            setUnidadMedidaSeleccionada(productoAEditar.unidadMedida);
            setModoEdicion(true);
        } else {
            console.error(`No se encontró el producto con código: ${codigo}`);
        };
    };

    const handleUpdate = async () => {
        console.log('productoSeleccionado:', productoSeleccionado);
        try {
            const productoActualizado = {
                nombre: nombre.toLowerCase(),
                existencia,
                categoria: categoriaSeleccionada,
                marca: marcaSeleccionada,
                unidadMedida: unidadMedidaSeleccionada,
            };
            const response = await axios.put(
                `http://localhost:8080/api/productos/${productoSeleccionado.codigo}`, 
                productoActualizado
            );
            console.log('Producto actualizado:', response.data);
            setNombre('');
            setExistencia('');
            setCategoriaSeleccionada('');
            setMarcaSeleccionada('');
            setUnidadMedidaSeleccionada('');
            setModoEdicion(false);
            fetchProductos();            
            // setProductos(productos.map((producto) => (producto.id === editingId ? response.data : producto)));
            resetForm();
        } catch (error) {
            console.error('Error al actualizar producto', error);
        }
    };

    const resetForm = () => {
        setCodigo('');
        setNombre('');
        setExistencia('');
        setCategoriaSeleccionada('');
        setMarcaSeleccionada('');
        setUnidadMedidaSeleccionada('');
        // setEditingId(null);
    };

    const fetchProductos = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos', error);
        }
    };

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

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/marcas');
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
                const response = await axios.get('http://localhost:8080/api/categorias');
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
                const response = await axios.get('http://localhost:8080/api/unidadesMedida');
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
                        <option key={marca.id} value={marca.id}>
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
                        <option key={unidadMedida.id} value={unidadMedida.id}>
                            {unidadMedida.nombre}
                        </option>
                    ))}
                </select>
                <div className='botones'>
                    {modoEdicion ? (
                        <button onClick={handleUpdate} className='btn-finalizar'>Actualizar</button>
                    ) : (
                        <button onClick={handleCreate} className='btn-finalizar'>Crear</button>
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
                        <th>Categoría</th>
                        <th>Marca</th>
                        <th>Unidad de Medida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        console.log(producto),
                        <tr key={producto.codigo}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.existencia}</td>
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
