// UnidadMedidaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

const UnidadMedidaList = () => {
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [nombreUnidadMedida, setNombreUnidadMedida] = useState('');
  const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  const fetchUnidadesMedida = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/unidadesMedida');
      setUnidadesMedida(response.data);
    } catch (error) {
      console.error('Error al obtener unidades de medida', error);
    }
  };

  const handleCrearUnidadMedida = async () => {
    try {
      const nuevaUnidadMedida = {
        nombre: nombreUnidadMedida,
      };

      const response = await axios.post('http://localhost:8080/api/unidadesMedida', nuevaUnidadMedida);
      console.log('Unidad de medida creada:', response.data);
      setNombreUnidadMedida('');
      fetchUnidadesMedida();
    } catch (error) {
      console.error('Error al crear unidad de medida', error);
    }
  };

  // const handleEliminarUnidadMedida = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/unidadesMedida/${id}`);
  //     console.log('Unidad de medida eliminada:', response.data);
  //     fetchUnidadesMedida();
  //   } catch (error) {
  //     console.error('Error al eliminar unidad de medida', error);
  //   }
  // };

  const handleEditarUnidadMedida = (unidadMedida) => {
    setNombreUnidadMedida(unidadMedida.nombre);
    setUnidadMedidaSeleccionada(unidadMedida.id);
    setModoEdicion(true);
  };

  const handleActualizarUnidadMedida = async () => {
    try {
      const unidadMedidaActualizada = {
        nombre: nombreUnidadMedida,
      };

      const response = await axios.put(
        `http://localhost:8080/api/unidadesMedida/${unidadMedidaSeleccionada}`,
        unidadMedidaActualizada
      );

      console.log('Unidad de medida actualizada:', response.data);
      setNombreUnidadMedida('');
      setUnidadMedidaSeleccionada('');
      setModoEdicion(false);
      fetchUnidadesMedida();
    } catch (error) {
      console.error('Error al actualizar unidad de medida', error);
    }
  };

  useEffect(() => {
    fetchUnidadesMedida();
  }, []);

  return (
    <div>
        <MenuHamburguesa />
      <h2>Administrar Unidades de Medida</h2>
      <div>
        <h3>{modoEdicion ? 'Editar' : 'Crear'} Unidad de Medida</h3>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre de la Unidad de Medida"
          value={nombreUnidadMedida}
          onChange={(e) => setNombreUnidadMedida(e.target.value)}
        />
        {modoEdicion ? (
          <button className='btn-ventas' onClick={handleActualizarUnidadMedida}>Actualizar</button>
        ) : (
          <button className='btn-ventas' onClick={handleCrearUnidadMedida}>Crear</button>
        )}
      </div>

      {/* Listado de Unidades de Medida */}
      <div>
        <h3>Listado de Unidades de Medida</h3>
        <table className='tabla'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidadesMedida.map((unidadMedida) => (
              <tr key={unidadMedida.id}>
                <td>{unidadMedida.id}</td>
                <td>{unidadMedida.nombre}</td>
                <td className='btn-ventas'>
                  {/* <button onClick={() => handleEliminarUnidadMedida(unidadMedida.id)}>Eliminar</button> */}
                  <button onClick={() => handleEditarUnidadMedida(unidadMedida)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnidadMedidaList;
