// MarcaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

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
      const response = await axios.post('http://localhost:8080/api/marcas', { nombre: nombre.toLowerCase() });
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
      const response = await axios.put(`http://localhost:8080/api/marcas/${marcaSeleccionada.id}`, { nombre: nuevoNombre.toLowerCase() });
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
    <div className='registro'>
      <MenuHamburguesa />
      <h1>Administrar Marcas</h1>

      <div>
        <h4>{marcaSeleccionada ? 'Editar' : 'Agregar'} Marca</h4>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre de la Marca"
          value={marcaSeleccionada ? nuevoNombre : nombre}
          onChange={(e) => marcaSeleccionada ? setNuevoNombre(e.target.value.toLowerCase()) : setNombre(e.target.value.toLowerCase())}
        />
        <div className='botones'>
          {marcaSeleccionada ? (
            <button onClick={handleActualizarMarca}>Actualizar Marca</button>
          ) : (
            <button onClick={handleCrearMarca}>Agregar Marca</button>
          )}
        </div>
      </div>

      <div>
        <h4>Listado de Marcas</h4>
        {mensaje && <p className={mensaje.includes('Error') ? 'mensaje-error' : 'mensaje-exito'}>{mensaje}</p>}
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
                <td className='btn-ventas'>
                  <div className='botones'>
                    <button className='btn-finalizar' onClick={() => handleEditarMarca(marca)}>Editar</button>
                  </div>
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