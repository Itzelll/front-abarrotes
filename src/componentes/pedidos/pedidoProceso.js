import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../MenuHamburguesa';
import '../pantallasGerente/style/catalogo.css';
import '../pantallasGerente/style/salesReport.css';
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import DetallesVentaModal from './DetallesVentaModal';

const VistaNotaVentaPedidoEnProcesoComponent = () => {
  const [notasVentaEnProceso, setNotasVentaEnProceso] = useState([]);
  const [filtroNombreCliente, setFiltroNombreCliente] = useState('');
  const [notasFiltradas, setNotasFiltradas] = useState([]);
  const [showDetalles, setShowDetalles] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);

  useEffect(() => {
    fetchNotasVentaEnProceso();
  }, []);

  const fetchNotasVentaEnProceso = async () => {
    try {
      const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/vista-nota-venta-pedido-en-proceso');
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

  const handleVerDetalles = (nota) => {
    setSelectedNota(nota);
    setShowDetalles(true);
  };

  return (
    <div className='registro'>
      <MenuHamburguesa />
      <h1 className='titulos'>Estados de Pedidos de Notas de Venta</h1>
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
          // console.log(nota),
          <div key={nota.idAnticipo} className="rectangulo">
            <div className="botones">
              <h4>Acciones del pedido:</h4>
              <div className='r-1'> 
                <button className='btn-finalizar rh c'>Cancelar Pedido</button>
                <button className='btn-finalizar rh e'>Entregar</button>
                <button className='btn-finalizar rh'>Pagar y entregar</button>
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
                <p><b>Departamento: </b>{nota.departamento}</p>
              </div>
              <div className='r-1'>
                <p><b>Total: </b>{nota.total}</p>
                <p><b>Abonado: </b>{nota.monto}</p>
                <p><b>Debe: </b>{nota.resto}</p>
              </div>
            </div>
            <div className="rectangulo-header" style={{ backgroundColor: '#c6c6c6' }}>
              <div className='r-1'>
                <button className='btn-finalizar rh' onClick={() => handleVerDetalles(nota)}>
                  Ver Detalles
                  <IoMdArrowDropdownCircle className='icon' />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Ventana emergente para los detalles de la venta */}
        {showDetalles && selectedNota && (
          <DetallesVentaModal
            numeroNota={selectedNota.numeroNota}
            onClose={() => setShowDetalles(false)}
          />
        )}
      </div>
    </div>
  );
};

export default VistaNotaVentaPedidoEnProcesoComponent;
