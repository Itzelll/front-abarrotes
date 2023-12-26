// UnidadMedidaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../../MenuHamburguesa';
import '../style/catalogo.css';
import '../style/salesReport.css';

const UnidadMedidaList = () => {
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [nombreUnidadMedida, setNombreUnidadMedida] = useState('');
  const [idUnidadMedida, setIdUnidadMedida] = useState('');
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
        idUnidadMed: idUnidadMedida,
        nombre: nombreUnidadMedida.toLowerCase(),
      };

      const response = await axios.post('http://localhost:8080/api/unidadesMedida', nuevaUnidadMedida);
      console.log('Unidad de medida creada:', response.data);
      setIdUnidadMedida('');
      setNombreUnidadMedida('');
      fetchUnidadesMedida();
    } catch (error) {
      console.error('Error al crear unidad de medida', error);
    }
  };

  const handleEditarUnidadMedida = (idUnidadMed) => {
    console.log('Editar unidad de medida con ID:', idUnidadMed);
    const unidadMedida = unidadesMedida.find((u) => u.idUnidadMedida === idUnidadMed);
    if (unidadMedida) {
      setUnidadMedidaSeleccionada(unidadMedida);
      setNombreUnidadMedida(unidadMedida.nombre);
      setModoEdicion(true);
    } else {
      console.error(`No se encontró la unidad de medida con ID: ${idUnidadMed}`);
    }
  };

  const handleActualizarUnidadMedida = async () => {
    console.log('unidadMedidaSeleccionada:', unidadMedidaSeleccionada);
    try {
      const unidadMedidaActualizada = {
        nombre: nombreUnidadMedida.toLowerCase(),
      };
      console.log(unidadMedidaActualizada);

      const response = await axios.put(
        `http://localhost:8080/api/unidadesMedida/${unidadMedidaSeleccionada.idUnidadMedida}`,
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
    <div className='registro'>
      <MenuHamburguesa />
      <h1>Administrar Unidades de Medida</h1>
      <div>
        <h4>{modoEdicion ? 'Editar' : 'Crear'} Unidad de Medida</h4>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre de la Unidad de Medida"
          value={nombreUnidadMedida}
          onChange={(e) => setNombreUnidadMedida(e.target.value.toLowerCase())}
        />
        <div className='botones'>
          {modoEdicion ? (
            <button className='btn-finalizar' onClick={handleActualizarUnidadMedida}>Actualizar</button>
          ) : (
            <button className='btn-finalizar' onClick={handleCrearUnidadMedida}>Crear</button>
          )}
        </div>
      </div>

      {/* Listado de Unidades de Medida */}
      <div>
        <h4>Listado de Unidades de Medida</h4>
        <table className='registroEmp'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidadesMedida.map((unidadMedida) => (
              // console.log(unidadMedida),
              <tr key={unidadMedida.idUnidadMedida}>
                <td>{unidadMedida.idUnidadMedida}</td>
                <td>{unidadMedida.nombre}</td>
                <td className='btn-ventas'>
                  <button className='btn-finalizar' onClick={() => handleEditarUnidadMedida(unidadMedida.idUnidadMedida)}>Editar</button>
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
