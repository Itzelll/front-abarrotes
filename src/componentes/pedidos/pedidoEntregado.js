import React, { useState, useEffect } from 'react';
import MenuHamburguesa from '../MenuHamburguesa';
import '../pantallasGerente/style/catalogo.css';
import '../pantallasGerente/style/salesReport.css';
import '../Calendar.js'; // Asegúrate de importar el componente Calendar si es necesario
import Calendar from '../Calendar.js';

const API_URL = 'https://abarrotesapi-service-yacruz.cloud.okteto.net';

const PedidoEntregado = () => {
    const [notasVentaPedidoEntregado, setNotasVentaPedidoEntregado] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    // const [filtroDepartamento, setFiltroDepartamento] = useState('');
    const [filtroEstadoPago, setFiltroEstadoPago] = useState('');

    useEffect(() => {
        const fetchNotasVentaPedidoEntregado = async () => {
            try {
                const response = await fetch(`${API_URL}/api/vista-nota-venta-pedido-entregado`);
                const data = await response.json();
                setNotasVentaPedidoEntregado(data);
            } catch (error) {
                console.error('Error al obtener las notas de venta pedido entregado:', error);
            }
        };

        fetchNotasVentaPedidoEntregado();
    }, [filtroCliente, filtroFecha, filtroEstadoPago
        // filtroDepartamento
    ]);

    const handleFiltroClienteChange = (e) => {
        setFiltroCliente(e.target.value);
    };

    const handleFiltroFechaChange = (date) => {
        setFiltroFecha(date);
    };

    const handleFiltroEstadoPagoChange = (e) => {
        setFiltroEstadoPago(e.target.value);
    };

    const filtrarDatos = () => {
        return notasVentaPedidoEntregado.filter(nota => {
            const fechaNota = nota.fechaNota || '';

            return (
                nota.nombreCompletoCliente.toLowerCase().includes(filtroCliente.toLowerCase()) &&
                ((filtroFecha === null) || (filtroFecha === '' || fechaNota.includes(filtroFecha.toISOString().slice(0, 10)))) 
                &&
                (filtroEstadoPago === '' || nota.estadoPago.toLowerCase().includes(filtroEstadoPago.toLowerCase()))
                // nota.nombreDepartamento.toLowerCase().includes(filtroDepartamento.toLowerCase())
            );
        });
    };

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Pedidos Entregados</h1>
            <h4>Filtros:</h4>
            <div className='r-1'>
                <div>
                    <label>Filtrar por Cliente:</label>
                    <input type="text" value={filtroCliente} onChange={handleFiltroClienteChange} />
                </div>
                <div>
                    <label>Filtrar por Fecha Nota:</label>
                    <Calendar
                        selectedDate={filtroFecha}
                        handleDateChange={handleFiltroFechaChange}
                    />
                </div>
                <div>
                    <label>Filtrar por Estado de Pago:</label>
                    <input type="text" value={filtroEstadoPago} onChange={handleFiltroEstadoPagoChange} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Número de Nota</th>
                        <th>Fecha de Anticipo</th>
                        <th>Monto</th>
                        <th>Resto</th>
                        <th>Estado de Pago</th>
                        <th>Nombre Cliente</th>
                        <th>Teléfono Cliente</th>
                        <th>Dirección Cliente</th>
                        <th>Nombre Empleado</th>
                        <th>Fecha de Nota</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarDatos().map((nota) => (
                        <tr key={nota.numeroNota}>
                            <td>{nota.numeroNota}</td>
                            <td>{nota.fechaAnticipo}</td>
                            <td>{nota.monto}</td>
                            <td>{nota.resto}</td>
                            <td>{nota.estadoPago}</td>
                            <td>{nota.nombreCompletoCliente}</td>
                            <td>{nota.telefono}</td>
                            <td>{nota.direccion}</td>
                            <td>{nota.nombreCompletoEmpleado}</td>
                            <td>{nota.fechaNota}</td>
                            <td>{nota.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidoEntregado;
