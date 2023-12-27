// CategoriaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);

    const fetchCategorias = async () => {
        try {
            const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorías', error);
        }
    };

    const handleCrearCategoria = async () => {
        try {
            const nuevaCategoria = {
                nombre: nombreCategoria.toLowerCase(),
            };

            const response = await axios.post('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/categorias', nuevaCategoria);
            console.log('Categoría creada:', response.data);
            setNombreCategoria('');
            fetchCategorias();
        } catch (error) {
            console.error('Error al crear categoría', error);
        }
    };

    // const handleEliminarCategoria = async (id) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:8080/api/categorias/${id}`);
    //         console.log('Categoría eliminada:', response.data);
    //         fetchCategorias();
    //     } catch (error) {
    //         console.error('Error al eliminar categoría', error);
    //     }
    // };

    const handleEditarCategoria = (categoria) => {
        setNombreCategoria(categoria.nombre);
        setCategoriaSeleccionada(categoria.id);
        setModoEdicion(true);
    };

    const handleActualizarCategoria = async () => {
        try {
            const categoriaActualizada = {
                nombre: nombreCategoria.toLowerCase(),
            };

            const response = await axios.put(
                `https://abarrotesapi-service-yacruz.cloud.okteto.net/api/categorias/${categoriaSeleccionada}`,
                categoriaActualizada
            );

            console.log('Categoría actualizada:', response.data);
            setNombreCategoria('');
            setCategoriaSeleccionada('');
            setModoEdicion(false);
            fetchCategorias();
        } catch (error) {
            console.error('Error al actualizar categoría', error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Administrar Categorías</h1>
            <div>
                <h4>{modoEdicion ? 'Editar' : 'Crear'} Categoría</h4>
                <input
                    className='input-producto'
                    type="text"
                    placeholder="Nombre de la Categoría"
                    value={nombreCategoria}
                    onChange={(e) => setNombreCategoria(e.target.value.toLowerCase())}
                />
                <div className='botones'>
                    {modoEdicion ? (
                        <button className='btn-finalizar' onClick={handleActualizarCategoria}>Actualizar</button>
                    ) : (
                        <button className='btn-finalizar' onClick={handleCrearCategoria}>Crear</button>
                    )}
                </div>
            </div>

            {/* Listado de Categorías */}
            <div>
                <h4>Listado de Categorías</h4>
                <table className='registroEmp'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.idCategoria}>
                                <td>{categoria.idCategoria}</td>
                                <td>{categoria.nombre}</td>
                                <td className='btn-ventas'>
                                    {/* <button onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</button> */}
                                    <button className='btn-finalizar' onClick={() => handleEditarCategoria(categoria)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoriaList;