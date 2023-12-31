import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from '../MenuHamburguesa';
import '../pantallasGerente/style/catalogo.css';
import '../pantallasGerente/style/salesReport.css';
import Calendar from '../Calendar';

const NotasPagadas = () => {
    const [data, setData] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroDepartamento, setFiltroDepartamento] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/vista-nota-venta-pagada');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [filtroCliente, filtroFecha, filtroDepartamento]);

    const handleFiltroClienteChange = (e) => {
        setFiltroCliente(e.target.value);
    };

    const handleFiltroFechaChange = (date) => {
        setFiltroFecha(date);
    };

    const handleFiltroDepartamentoChange = (e) => {
        setFiltroDepartamento(e.target.value);
    };

    const filtrarDatos = () => {
        return data.filter(item => {
            const fechaNota = item.fechaNota || ''; // Manejar el caso en que fechaNota es null
            return (
                item.nombreCompletoCliente.toLowerCase().includes(filtroCliente.toLowerCase()) &&
                ((filtroFecha === null) || (filtroFecha === '' || fechaNota.includes(filtroFecha.toISOString().slice(0, 10)))) &&
                item.nombreDepartamento.toLowerCase().includes(filtroDepartamento.toLowerCase())
            );
        });
    };

    return (
        <div className='registro'>
            <MenuHamburguesa />
            <h1>Lista de Notas de Venta Pagadas</h1>
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
                    {/* <input type="text" value={filtroFecha} onChange={handleFiltroFechaChange} /> */}
                </div>

                <div>
                    <label>Filtrar por Departamento:</label>
                    <input type="text" value={filtroDepartamento} onChange={handleFiltroDepartamentoChange} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numero Nota</th>
                        <th>Nombre Cliente</th>
                        <th>Telefono</th>
                        <th>Dirección</th>
                        <th>Nombre Vendedor</th>
                        <th>Fecha Nota</th>
                        <th>Fecha Anticipo</th>
                        <th>Monto</th>
                        <th>Resto</th>
                        <th>Total</th>
                        {/* <th>Estado</th> */}
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarDatos().map(item => (
                        <tr key={item.numeroNota}>
                            <td>{item.numeroNota}</td>
                            <td>{item.nombreCompletoCliente}</td>
                            <td>{item.telefonoCliente}</td>
                            <td>{item.direccionCliente}</td>
                            <td>{item.nombreCompletoEmpleado}</td>
                            <td>{item.fechaNota}</td>
                            <td>{item.fechaAnticipo}</td>
                            <td>{item.monto}</td>
                            <td>{item.resto}</td>
                            <td>{item.total}</td>
                            {/* <td>{item.estadoPago}</td> */}
                            <td>{item.nombreDepartamento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NotasPagadas;