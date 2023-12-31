import React, { useState, useEffect } from 'react';
import MenuHamburguesa from '../MenuHamburguesa';
import '../pantallasGerente/style/catalogo.css';
import '../pantallasGerente/style/salesReport.css';
import '../Calendar.js';
import Calendar from '../Calendar.js';

const PedidoCancelado = () => {
    const [notasVentaCanceladas, setNotasVentaCanceladas] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    // const [filtroDepartamento, setFiltroDepartamento] = useState('');

    useEffect(() => {
        const fetchNotasVentaCanceladas = async () => {
            try {
                const response = await fetch('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/vista-nota-venta-pedido-cancelado');
                const data = await response.json();
                setNotasVentaCanceladas(data);
            } catch (error) {
                console.error('Error al obtener las notas de venta canceladas:', error);
            }
        };

        fetchNotasVentaCanceladas();
    }, [filtroCliente, filtroFecha, 
        // filtroDepartamento
    ]);

    const handleFiltroClienteChange = (e) => {
        setFiltroCliente(e.target.value);
    };

    const handleFiltroFechaChange = (date) => {
        setFiltroFecha(date);
    };

    // const handleFiltroDepartamentoChange = (e) => {
    //     setFiltroDepartamento(e.target.value);
    // };

    const filtrarDatos = () => {
        return notasVentaCanceladas.filter(nota => {
            const fechaNota = nota.fechaNota || '';

            return (
                nota.nombreCompletoCliente.toLowerCase().includes(filtroCliente.toLowerCase()) &&
                ((filtroFecha === null) || (filtroFecha === '' || fechaNota.includes(filtroFecha.toISOString().slice(0, 10)))) 
                // &&
                // nota.nombreDepartamento.toLowerCase().includes(filtroDepartamento.toLowerCase())
            );
        });
    };

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Pedidos Cancelados</h1>
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
                {/* <div>
                    <label>Filtrar por Departamento:</label>
                    <input type="text" value={filtroDepartamento} onChange={handleFiltroDepartamentoChange} />
                </div> */}
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
                        <th>Estado</th>
                        {/* <th>Nombre Departamento</th> */}
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
                            <td>{nota.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidoCancelado;