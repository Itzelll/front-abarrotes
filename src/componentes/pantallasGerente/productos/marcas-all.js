// MarcaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';

const MarcaList = () => {
  const [nombre, setNombre] = useState('');
  const [marcas, setMarcas] = useState([]);

  const fetchMarcas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/marcas');
      setMarcas(response.data);
    } catch (error) {
      console.error('Error al obtener marcas', error);
    }
  };

  const handleCrearMarca = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/marcas', { nombre });
      console.log('Marca creada:', response.data);
      setNombre('');
      fetchMarcas();
    } catch (error) {
      console.error('Error al crear marca', error);
    }
  };

  const handleEliminarMarca = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/marcas/${id}`);
      console.log('Marca eliminada:', response.data);
      fetchMarcas();
    } catch (error) {
      console.error('Error al eliminar marca', error);
    }
  };

  const handleModificarMarca = async (id, nuevoNombre) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/marcas/${id}`, { nombre: nuevoNombre });
      console.log('Marca actualizada:', response.data);
      fetchMarcas();
    } catch (error) {
      console.error('Error al actualizar marca', error);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  return (
    <div className='registro'>
      <MenuHamburguesa />
      <h1>Administrar Marcas</h1>

      {/* Agregar Nueva Marca */}
      <div>
        <h4>Agregar Nueva Marca</h4>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre de la Marca"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <div className='botones'>
          <button onClick={handleCrearMarca} className='btn-finalizar'>Agregar Marca</button>
        </div>
      </div>

      {/* Listado de Marcas */}
      <div>
        <h4>Listado de Marcas</h4>
        <table className='registroEmp'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.id}</td>
                <td>{marca.nombre}</td>
                <td>
                  <button onClick={() => handleEliminarMarca(marca.id)}>Eliminar</button>
                  <input
                    className='input-producto'
                    type="text"
                    placeholder="Nuevo Nombre"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <button onClick={() => handleModificarMarca(marca.id, nombre)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarcaList;
