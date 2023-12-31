import React, { useState, useEffect, useRef } from "react";
import MenuHamburguesa from './MenuHamburguesa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { CgAdd } from "react-icons/cg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = date => {
        setSelectedDate(date);
        closeCalendar();
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const closeCalendar = () => {
        setIsCalendarOpen(false);
    };

    return (
        <div>
            <div onClick={toggleCalendar}>
                <DatePicker
                    className="fecha-entrega"
                    placeholderText="Fecha de entrega"
                    selected={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleDateChange}
                    onClickOutside={closeCalendar}
                />
            </div>
        </div>
    );
};

const TimePickerModal = ({ isOpen, onClose, onSelectTime }) => {
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
    }, [isOpen]);

    const handleTimeChange = (value) => {
        setSelectedTime(value);
    };

    const handleSelectTime = () => {
        onSelectTime(selectedTime.format('HH:mm:ss'));
        onClose();
    };

    return (
        isOpen && (
            <div className="select-hora">
                <div className="time-picker-modal">
                    <TimePicker
                        placeholder="seleccionar hora"
                        showSecond={false}
                        defaultValue={selectedTime}
                        onChange={handleTimeChange}
                    />

                    <button className="btn-seleccionar" onClick={handleSelectTime}>Seleccionar</button>
                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>

                </div>
            </div>
        )
    );
};

const Pedidos = () => {
    const [cliente, setCliente] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [horaEntrega, setHoraEntrega] = useState("");
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [cantidad, setCantidad] = useState("");
    const [producto, setProducto] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [ventas, setVentas] = useState([]);
    const [montoRecibido, setMontoRecibido] = useState("");
    const [departamento, setDepartamento] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [clienteInfo, setClienteInfo] = useState(null);

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fechaFormateada = format(hoy, 'yyyy-MM-dd');

    const fetchClientes = async () => {
        try {
            const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/clientes');
            setCliente(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes', error);
        }
    };

    const handleCreatePedido = async () => {
        try {
            const nuevoPedido = {
                fecha: fechaFormateada,
                total: parseFloat(calcularTotal()),
                anticipo: {
                    monto: parseFloat(calcularTotal()), // Asume que el anticipo es el total de la venta                
                },
                cliente: {
                    idCliente: 2
                },
                empleado: {
                    idEmpleado: 3
                },
                departamento: {
                    idDepartamento: parseInt(departamentoSeleccionado)
                },
                detallePedido: {
                    idDetallePedido: 3,
                    fechaEntrega: "2023-12-18",
                    horaEntrgea: "00:00"
                },
                detalleVenta: ventas.map((producto) => ({
                    cantidad: parseFloat(producto.cantidad),
                    subtotal: parseFloat(producto.subtotal),
                    producto: {
                        codigo: parseInt(producto.producto)
                    }
                })),
            };
            console.log('Nueva venta:', nuevoPedido);
            const response = await axios.post('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/pedido', nuevoPedido);
            console.log('Pedido creado:', response.data);
            alert('Pedido creado con éxito');
            resetForm();
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            alert('Error al crear el pedido');
        }

    }

    useEffect(() => {
        const fetchDepartamento = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/departamento');
                setDepartamento(response.data);
            } catch (error) {
                console.error('Error al obtener los departamentos', error);
            }
        };
        fetchDepartamento();
    }, []);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/clientes');
                setCliente(response.data);
            } catch (error) {
                console.error('Error al obtener los clientes', error);
            }
        };
        fetchCliente();
    }, []);    

    useEffect(() => {
        const fetchClienteDetalle = async (idCliente) => {
            try {
                const response = await axios.get(`https://abarrotesapi-service-yacruz.cloud.okteto.net/api/clientes/${idCliente}`);
                setClienteInfo(response.data);
            } catch (error) {
                console.error('Error al obtener la información del cliente', error);
            }
        };

        if (clienteSeleccionado) {
            fetchClienteDetalle(clienteSeleccionado);
        } else {
            setClienteInfo(null);
        }
    }, [clienteSeleccionado]);

    useEffect(() => {
        const obtenerPrecioUnitario = async (codigo) => {
            try {
                const response = await fetch(`https://abarrotesapi-service-yacruz.cloud.okteto.net/api/productos/${codigo}`);
                const data = await response.json();
                console.log(data);
                setPrecioUnitario(data.precio); // Asume que la API devuelve un objeto con la propiedad 'precio'
            } catch (error) {
                console.error("Error al obtener el precio unitario:", error);
            }
        };

        if (producto) {
            obtenerPrecioUnitario(producto);
        }
    }, [producto]);

    const AddClientModal = ({ onClose }) => {
        const [nombre, setNombre] = useState("");
        const [apellidos, setApellidos] = useState("");
        const [telefono, setTelefono] = useState("");
        const [direccion, setDireccion] = useState("");

        const handleCreateClient = async () => {
            try {
                const nuevoCliente = {
                    nombre: nombre,
                    apellidos: apellidos,
                    telefono: parseInt(telefono),
                    direccion: direccion,
                };
            
                const response = await axios.post('https://abarrotesapi-service-yacruz.cloud.okteto.net/api/clientes', nuevoCliente);
                await fetchClientes();
                console.log('Cliente creado:', response.data);
                alert('Cliente creado con éxito');
                onClose();
            } catch (error) {
                console.error('Error al crear el cliente:', error);
                alert('Error al crear el cliente');
            }
        }

        const handleNombreChange = (e) => {
            setNombre(e.target.value);
        }

        const handleApellidosChange = (e) => {
            setApellidos(e.target.value);
        }

        const handleTelefonoChange = (e) => {
            setTelefono(e.target.value);
        }

        const handleDireccionChange = (e) => {
            setDireccion(e.target.value);
        }

        return (
            // JSX de la pantalla flotante
            <div className="modal-overlay">
                <div className="modal-content">
                    <MenuHamburguesa />
                    <h2>Nuevo Cliente</h2>

                    <div className="input">
                        <input
                            className="cantidad"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                        />
                        <input
                            className="cantidad"
                            placeholder="Apellidos"
                            value={apellidos}
                            onChange={handleApellidosChange}
                        />
                        <input
                            className="cantidad"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={handleTelefonoChange}
                        />
                        <input
                            className="cantidad"
                            placeholder="Dirección"
                            value={direccion}
                            onChange={handleDireccionChange}
                        />
                    </div>
                    <div className="btns">
                        <button className="btn-finalizar" onClick={handleCreateClient}>Guardar</button>
                        <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    };

    const agregarProducto = async () => {
        if (cantidad && producto && precioUnitario) {
            try {
                const response = await fetch(`https://abarrotesapi-service-yacruz.cloud.okteto.net/api/productos/${producto}`);
                const data = await response.json();
                const unidadDeMedida = data.unidadMedida;

                const nuevoProducto = {
                    cantidad: parseFloat(cantidad),
                    producto: producto,
                    nombre: data.nombre,
                    precioUnitario: parseFloat(precioUnitario).toFixed(2),
                    subtotal: parseFloat(calcularSubtotal(unidadDeMedida)).toFixed(2),
                };

                setVentas([...ventas, nuevoProducto]);

                // Limpiar los campos después de agregar el producto
                setCantidad("");
                setProducto("");
                setPrecioUnitario("");
            } catch (error) {
                console.error("Error al obtener la información del producto:", error);
            }
        }
    };

    const handleHoraEntrega = () => {
        setIsTimePickerOpen(true);
    };

    const handleCloseTimePicker = () => {
        setIsTimePickerOpen(false);
    };

    const handleSelectTime = (selectedTime) => {
        setHoraEntrega(selectedTime);
    };

    const handleCantidadChange = (e) => {
        setCantidad(e.target.value);
    };

    const handleProductoChange = (e) => {
        setProducto(e.target.value);
    };

    const handlePrecioUnitarioChange = (e) => {
        setPrecioUnitario(e.target.value);
    };

    const handleMontoRecibidoChange = (e) => {
        setMontoRecibido(e.target.value);
    };

    const openAddClientModal = () => {
        setIsAddClientModalOpen(true);
    };

    const closeAddClientModal = () => {
        setIsAddClientModalOpen(false);
    };

    const calcularSubtotal = (unidadDeMedida) => {
        console.log('unidad de medida: ', unidadDeMedida)
        if (unidadDeMedida === 'gramos') {
            return parseFloat((parseFloat(cantidad) * parseFloat(precioUnitario) / 100).toFixed(2));
        }
        else {
            return parseFloat((parseFloat(cantidad) * parseFloat(precioUnitario)).toFixed(2));
        }
    }

    const calcularTotal = () => {
        return ventas.reduce((total, producto) => total + parseFloat(producto.subtotal), 0).toFixed(2);
    };

    const cancelarVenta = () => {
        if (window.confirm("¿Estás seguro de cancelar la venta?")) {
            resetForm();
            console.log("Venta cancelada");
        }
    }

    const resetForm = () => {
        setDepartamentoSeleccionado('');
        setClienteSeleccionado('');
        setCantidad("");
        setProducto("");
        setPrecioUnitario("");
        setVentas([]);
        setMontoRecibido("");
    }

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Nuevo pedido</h1>
            <div className="fecha">
                <label className="fecha">Fecha : {hoy.toDateString()}</label>
            </div>
            <br />
            <div className="pedidos">
                <div className="departamentos">
                    <select
                        className="select-departamento"
                        value={departamentoSeleccionado}
                        onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un departamento</option>
                        {departamento.map((departamento) => (
                            <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                                {departamento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="clientes">
                    <select
                        className="select-cliente"
                        value={clienteSeleccionado}
                        onChange={(e) => setClienteSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un cliente</option>
                        {cliente.map((cliente) => (
                            <option key={cliente.idCliente} value={cliente.idCliente}>
                                {cliente.nombre + ' ' + cliente.apellidos}
                            </option>
                        ))}
                    </select>
                    <div className="mas" onClick={openAddClientModal}>
                        <Link className='no-underline'><CgAdd /></Link>
                    </div>
                    {isAddClientModalOpen && (
                        <AddClientModal onClose={closeAddClientModal} />
                    )}
                </div>
            </div>
            {clienteInfo && (
                <div className="detalles-cliente">
                    <h4>Información del Cliente seleccionado</h4>
                    <table>
                        <thead className="ventas">
                            <tr className="ventas">
                                <th className="ventas">ID</th>
                                <th className="ventas">Nombre</th>
                                <th className="ventas">Apellidos</th>
                                <th className="ventas">Teléfono</th>
                                <th className="ventas">Dirección</th>
                            </tr>
                        </thead>
                        <tbody className="ventas">
                            <tr className="ventas">
                                <td className="ventas">{clienteInfo.idCliente}</td>
                                <td className="ventas">{clienteInfo.nombre}</td>
                                <td className="ventas">{clienteInfo.apellidos}</td>
                                <td className="ventas">{clienteInfo.telefono}</td>
                                <td className="ventas">{clienteInfo.direccion}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </div>
            )}
            <div className="input">
                <div>
                    <Calendar />
                    <input
                        className="hora"
                        placeholder="Hora de entrega (HH:mm)"
                        format="HH:mm:ss"
                        value={horaEntrega}
                        onChange={() => { }}
                        onClick={handleHoraEntrega}
                    />
                    <TimePickerModal
                        isOpen={isTimePickerOpen}
                        onClose={handleCloseTimePicker}
                        onSelectTime={handleSelectTime}
                    />
                </div>
                <div>
                    <input
                        className="cantidad"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={handleCantidadChange}
                    />
                    <input
                        className="producto"
                        placeholder="Producto"
                        value={producto}
                        onChange={handleProductoChange}
                    />
                </div>
                <input
                    className="precio"
                    placeholder="Precio Unitario"
                    value={precioUnitario}
                    onChange={handlePrecioUnitarioChange}
                />
                <button className="agregar-prod" onClick={agregarProducto}>Agregar Producto</button>
                <div className="scroll-panel">
                    <table>
                        <thead className="ventas">
                            <tr className="ventas">
                                <th className="ventas">Cantidad</th>
                                <th className="ventas">Código Producto</th>
                                <th className="ventas">Producto</th>
                                <th className="ventas">Precio Unitario</th>
                                <th className="ventas">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="ventas">
                            {ventas.map((producto, index) => (
                                <tr key={index} className="ventas">
                                    <td className="ventas">{producto.cantidad}</td>
                                    <td className="ventas">{producto.producto}</td>
                                    <td className="ventas">{producto.nombre}</td>
                                    <td className="ventas">${producto.precioUnitario}</td>
                                    <td className="ventas">${parseFloat(producto.subtotal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3 className="total">Total: ${calcularTotal()}</h3>
                <input
                    className="producto"
                    placeholder="Monto Recibido"
                    value={montoRecibido}
                    onChange={handleMontoRecibidoChange}
                />
                <br /><br />
                <div className="btns">
                    <button className="btn-finalizar">
                        Finalizar
                    </button>
                    <button className="btn-cancelar" onClick={cancelarVenta}>Cancelar Venta</button>
                </div>
            </div>
        </div>
    );
}

export default Pedidos;