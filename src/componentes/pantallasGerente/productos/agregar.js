// CreateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';
import '../style/registroEmp.css';
// import { FaEdit } from "react-icons/fa";

const CreateProduct = () => {
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [existencia, setexistencia] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [marcas, setMarcas] = useState([]);  // Nuevo estado para almacenar la lista de marcas
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [unidadMedidas, setUnidadMedidas] = useState([]);
    const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState('');
    const [editingId, setEditingId] = useState(false);  // Nuevo estado para rastrear el ID del producto que se está editando

    const handleCreate = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/productos', {
                codigo,
                nombre: nombre.toLowerCase(),
                existencia,
                categoria: categoriaSeleccionada.idCategoria,  // Utilizar la categoría seleccionada
                marca: marcaSeleccionada.idCategoria,  // Utilizar la marca seleccionada
                unidadMedida: unidadMedidaSeleccionada.idCategoria,
            });
            console.log('Producto creado:', response.data);
            // Puedes actualizar la lista de productos después de la creación
            setProductos([...productos, response.data]);
        } catch (error) {
            console.error('Error al crear producto', error);
        }
    };

    const handleEdit = (id) => {
        // Establecer los valores actuales del producto en los campos de entrada
        const productoAEditar = productos.find((producto) => producto.id === id);
        if (productoAEditar) {
            setCodigo(productoAEditar.codigo);
            setNombre(productoAEditar.nombre);
            setexistencia(productoAEditar.existencia);
            setCategoriaSeleccionada(productoAEditar.categoria);
            setMarcaSeleccionada(productoAEditar.marca);
            setUnidadMedidaSeleccionada(productoAEditar.unidadMedida);
            setEditingId(true);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/productos/${editingId}`, {
                codigo,
                nombre: nombre.toLowerCase(),
                existencia,
                categoria: categoriaSeleccionada.id,
                marca: marcaSeleccionada.id,
                unidadMedida: unidadMedidaSeleccionada.id,
            });
            console.log('Producto actualizado:', response.data);
            // Actualizar la lista de productos después de la edición
            setProductos(productos.map((producto) => (producto.id === editingId ? response.data : producto)));
            // Limpiar los campos de entrada y el ID de edición
            setCodigo('');
            setNombre('');
            setexistencia('');
            setCategoriaSeleccionada('');
            setMarcaSeleccionada('');
            setUnidadMedidaSeleccionada('');
            setEditingId(null);
        } catch (error) {
            console.error('Error al actualizar producto', error);
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

    // Obtener la lista de marcas al cargar el componente
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

    // Obtener la lista de categorías al cargar el componente
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categorias');
                setCategorias(response.data);
                console.log('Categorías:', response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };

        fetchCategorias();
    }, []);

    // Obtener la lista de unidades de medida al cargar el componente
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
    }
        , []);

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Crear Producto</h1>
            <div>
                <h4>{editingId ? 'Editar' : 'Crear'} Producto</h4>
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
                    onChange={(e) => setexistencia(e.target.value)}
                />
                {/* Listas desplegables */}
                <select className='select-producto'
                    value={categoriaSeleccionada.idCategoria}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <select className='select-producto'
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
                <select className='select-producto'
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
                    {editingId ? (
                        <button onClick={handleUpdate} className='btn-finalizar'>Actualizar</button>
                    ) : (
                        <button onClick={handleCreate} className='btn-finalizar'>Crear</button>
                    )}
                </div>
            </div>
            {/* Lista en tabla de los productos que se van agregando */}
            <h4>Lista de Productos</h4>
            <table className="registroEmp2">
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
                <tbody >
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.existencia}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.unidadMedida}</td>
                            <td className='btn-ventas'>
                                <div className='botones'>
                                    <button className='btn-finalizar' onClick={() => handleEdit(producto.id)}>Editar</button>
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
