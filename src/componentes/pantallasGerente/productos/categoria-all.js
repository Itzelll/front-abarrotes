// CategoriaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from './MenuHamburguesa';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías', error);
    }
  };

  const handleCrearCategoria = async () => {
    try {
      const nuevaCategoria = {
        nombre: nombreCategoria,
      };

      const response = await axios.post('http://localhost:8080/api/categorias', nuevaCategoria);
      console.log('Categoría creada:', response.data);
      setNombreCategoria('');
      fetchCategorias();
    } catch (error) {
      console.error('Error al crear categoría', error);
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/categorias/${id}`);
      console.log('Categoría eliminada:', response.data);
      fetchCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  const handleEditarCategoria = (categoria) => {
    setNombreCategoria(categoria.nombre);
    setCategoriaSeleccionada(categoria.id);
    setModoEdicion(true);
  };

  const handleActualizarCategoria = async () => {
    try {
      const categoriaActualizada = {
        nombre: nombreCategoria,
      };

      const response = await axios.put(
        `http://localhost:8080/api/categorias/${categoriaSeleccionada}`,
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
    <div>
        <MenuHamburguesa />
      <h2>Administrar Categorías</h2>
      <div>
        <h3>{modoEdicion ? 'Editar' : 'Crear'} Categoría</h3>
        <input
          type="text"
          placeholder="Nombre de la Categoría"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
        />
        {modoEdicion ? (
          <button onClick={handleActualizarCategoria}>Actualizar</button>
        ) : (
          <button onClick={handleCrearCategoria}>Crear</button>
        )}
      </div>

      {/* Listado de Categorías */}
      <div>
        <h3>Listado de Categorías</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</button>
                  <button onClick={() => handleEditarCategoria(categoria)}>Editar</button>
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
