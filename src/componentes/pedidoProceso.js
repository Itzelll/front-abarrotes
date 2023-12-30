import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from './MenuHamburguesa';
import './pantallasGerente/style/catalogo.css'; 
import './pantallasGerente/style/salesReport.css'; 
import { IoSearchCircleOutline } from "react-icons/io5";

const VistaNotaVentaPedidoEnProcesoComponent = () => {
  const [notasVentaEnProceso, setNotasVentaEnProceso] = useState([]);
  const [filtroNombreCliente, setFiltroNombreCliente] = useState('');
  const [notasFiltradas, setNotasFiltradas] = useState([]);

  useEffect(() => {
    fetchNotasVentaEnProceso();
  }, []);

  const fetchNotasVentaEnProceso = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vista-nota-venta-pedido-en-proceso');
      setNotasVentaEnProceso(response.data);
      setNotasFiltradas(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBuscar = () => {
    const notasFiltradas = notasVentaEnProceso.filter(
      (nota) => nota.nombreCompletoCliente.toLowerCase().includes(filtroNombreCliente.toLowerCase())
    );
    setNotasFiltradas(notasFiltradas);
  };

  return (
    <div className='registro'>
      <MenuHamburguesa />
      <h1 className='titulos'>Estados de Notas de Venta</h1>
      <div className='btns'>
        <h4>Buscar nota:</h4>
        <input
          className='input-producto'
          type="text"
          placeholder="Nombre del cliente"
          value={filtroNombreCliente}
          onChange={(e) => setFiltroNombreCliente(e.target.value)}
        />
        <div className='botones'>
          <button onClick={handleBuscar} className='btn-icons'>
            <IoSearchCircleOutline />
          </button>
        </div>
      </div>
      <div className="rectangulos-container">
        {notasFiltradas.map((nota) => (
          <div key={nota.idAnticipo} className="rectangulo">
            <div className="rectangulo-header" style={{ backgroundColor: '#dddd' }}>
              <div className='r-1'>
                <button className='btn-finalizar'>Detalles</button>
              </div>
            </div>
            <div className="rectangulo-header" style={{ backgroundColor: '#f6f6f6' }}>
              <div className='r-1'>
                <p><b>Número de Nota: </b>{nota.numeroNota}</p>
                <p><b>Fecha de Nota: </b>{nota.fechaNota}</p>
                <p><b>Estado Pago: </b>{nota.estadoPago}</p>
              </div>
              <div className='r-1'>
                <p><b>Empleado: </b>{nota.nombreCompletoEmpleado}</p>
                <p><b>Estado: </b>{nota.estado}</p>
              </div>
            </div>

            <div className="rectangulo-header" style={{ backgroundColor: '#eee' }}>
              <div className='r2'>
                <b>Datos Cliente:</b>
              </div>
              <div className='r-1'>
                <p><b>Nombre Cliente: </b>{nota.nombreCompletoCliente}</p>
                <p><b>Teléfono: </b>{nota.telefono}</p>
              </div>
              <div className='r-2'>
                <p><b>Dirección: </b>{nota.direccion}</p>
              </div>
            </div>

            <div className="rectangulo-header" style={{ backgroundColor: '#ddd' }}>
              <div className='r-1'>
                <p><b>Fecha Anticipo: </b>{nota.fechaAnticipo}</p>
              </div>
              <div className='r-1'>
                <p><b>Total: </b>{nota.total}</p>
                <p><b>Abonado: </b>{nota.monto}</p>
                <p><b>Debe: </b>{nota.resto}</p>
              </div>
            </div>
            <div className="rectangulo-header" style={{ backgroundColor: '#c4c4c4' }}>
              <div className='r-1'>
                <button  className='btn-finalizar'>Cancelar</button>
                <button  className='btn-finalizar'>Entregar</button>
                <button  className='btn-finalizar'>Pagar y entregar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaNotaVentaPedidoEnProcesoComponent;
