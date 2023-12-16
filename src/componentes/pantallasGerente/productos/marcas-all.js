// MarcaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';

const MarcaList = () => {
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

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
      setMensaje('Marca creada con éxito.');
      fetchMarcas();
    } catch (error) {
      console.error('Error al crear marca', error);
      setMensaje('Error al crear marca.');
    }
  };

  const handleEditarMarca = (marca) => {
    setMarcaSeleccionada(marca);
    setNuevoNombre(marca.nombre);
  };

  const handleActualizarMarca = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/marcas/${marcaSeleccionada.id}`, { nombre: nuevoNombre });
      console.log('Marca actualizada:', response.data);
      setNuevoNombre('');
      setMarcaSeleccionada(null);
      setMensaje('Marca actualizada con éxito.');
      fetchMarcas();
    } catch (error) {
      console.error('Error al actualizar marca', error);
      setMensaje('Error al actualizar marca.');
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  return (
    <div>
      <MenuHamburguesa />
      <h2>Administrar Marcas</h2>

      <div>
        <h3>{marcaSeleccionada ? 'Editar' : 'Agregar'} Marca</h3>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre de la Marca"
          value={marcaSeleccionada ? nuevoNombre : nombre}
          onChange={(e) => marcaSeleccionada ? setNuevoNombre(e.target.value) : setNombre(e.target.value)}
        />
        {marcaSeleccionada ? (
          <button onClick={handleActualizarMarca}>Actualizar Marca</button>
        ) : (
          <button onClick={handleCrearMarca}>Agregar Marca</button>
        )}
      </div>

      <div>
        <h3>Listado de Marcas</h3>
        {mensaje && <p className={mensaje.includes('Error') ? 'mensaje-error' : 'mensaje-exito'}>{mensaje}</p>}
        <table className='tabla'>
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
                  <button onClick={() => handleEditarMarca(marca)}>Editar</button>
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
