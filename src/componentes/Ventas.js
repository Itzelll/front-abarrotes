import React, { useState, useEffect } from "react";
import "./pantallasGerente/style/salesReport.css";
import "./pantallasGerente/style/registroEmp.css";
import "./Ventas.css";
import MenuHamburguesa from './MenuHamburguesa';
import { PDFDownloadLink, Page, Document } from '@react-pdf/renderer';
import { SalesReportPDF } from '../componentes/pantallasGerente/styleSalesReportPDF';

// Componente para el informe de ventas en PDF
const SalesReport = ({ salesData }) => (
    <Document>
        <Page size="A4">
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
                    {salesData.map((producto, index) => (
                        <tr key={index} className="ventas">
                            <td className="ventas">{producto.cantidad}</td>
                            <td className="ventas">{producto.producto}</td>
                            <td className="ventas">{producto.nombre}</td>
                            <td className="ventas">${producto.precioUnitario}</td>
                            <td className="ventas">${producto.subtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Page>
    </Document>
);


const Ventas = () => {
    const [cantidad, setCantidad] = useState("");
    const [producto, setProducto] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [ventas, setVentas] = useState([]);
    const [montoRecibido, setMontoRecibido] = useState("");

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    // Verificar si localStorage tiene datos y asignar a userRole
    const storedUserRole = localStorage.getItem('userRole');
    console.log('Valor almacenado en localStorage:', storedUserRole);
    const userRole = storedUserRole ? JSON.parse(storedUserRole) : null;


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

    const agregarProducto = async () => {
        if (cantidad && producto && precioUnitario) {
            try {
                const response = await fetch(`http://localhost:8080/api/productos/${producto}`);
                const data = await response.json();
                const unidadDeMedida = data.unidadMedida;

                const nuevoProducto = {
                    cantidad: cantidad,
                    producto: producto,
                    nombre: data.nombre,
                    precioUnitario: parseFloat(precioUnitario).toFixed(2),
                    subtotal: calcularSubtotal(unidadDeMedida),
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

    const calcularSubtotal = (unidadDeMedida) => {
        console.log('unidad de medida: ', unidadDeMedida)
        if (unidadDeMedida == 'gramos') {
            return (parseFloat(cantidad) * parseFloat(precioUnitario) / 100).toFixed(2);
        }
        else {
            return (parseFloat(cantidad) * parseFloat(precioUnitario)).toFixed(2);
        }
    }

    const calcularTotal = () => {
        return ventas.reduce((total, producto) => total + parseFloat(producto.subtotal), 0).toFixed(2);
    };

    const cambio = () => {
        const totalVenta = parseFloat(calcularTotal());
        const montoRecibidoFloat = parseFloat(montoRecibido);

        if (!isNaN(totalVenta) && !isNaN(montoRecibidoFloat)) {
            return (montoRecibidoFloat - totalVenta).toFixed(2);
        } else {
            return "";
        }
    };
    console.log('userRole en RegistroEmp:', userRole);
    console.log('userRole.rol en RegistroEmp:', userRole && userRole.rol);
    console.log('¿Es Jefe?', userRole && userRole.rol && userRole.rol.includes("Jefe"));


    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Ventas</h1>
            <div className="fecha">
                <label className="fecha">Fecha : {hoy.toDateString()}</label>
            </div>
            <br />
            {userRole && userRole.rol && (userRole.rol === "Encargado_Departamento" || userRole.rol === "Encargado_Caja") ? (
                <div className="input">
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
                    /> <br />
                    <input
                        className="precio"
                        placeholder="Precio Unitario"
                        value={precioUnitario}
                        onChange={handlePrecioUnitarioChange}
                    />
                    <button onClick={agregarProducto}>Agregar Producto</button>
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
                                        <td className="ventas">${producto.subtotal}</td>
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
                    <h4 className="total">Cambio: ${cambio()}</h4>
                    <div className="btns">
                        <button className="btn-finalizar">
                            <PDFDownloadLink className="no-underline1"
                                document={<SalesReportPDF salesData={ventas} />}
                                fileName="sales_report.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Generando PDF...' : 'Finalizar Venta'
                                }
                            </PDFDownloadLink></button>
                        <button className="btn-cancelar">Cancelar Venta</button>
                    </div>
                </div>
            ) : (
                <p>No tienes permisos para visualizar empleados.</p>
            )}
        </div>
    );
}

export default Ventas;
