// Agregar los productos a la tabla automaticamente 
// (ingresando el precio unitario, pero solo se puede con un dígito)

import React, { useState, useEffect } from "react";
import "./pantallasGerente/style/salesReport.css";
import "./pantallasGerente/style/registroEmp.css";
import "./Ventas.css";
import MenuHamburguesa from './MenuHamburguesa';

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidad, setCantidad] = useState("");
    const [producto, setProducto] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");

    useEffect(() => {
        const cantidadValue = parseFloat(cantidad);
        const precioUnitarioValue = parseFloat(precioUnitario.replace(',', '.'));

        if (!isNaN(cantidadValue) && !isNaN(precioUnitarioValue)) {
            const subtotal = cantidadValue * precioUnitarioValue;

            setProductos((prevProductos) => [...prevProductos, { producto, cantidad: cantidadValue, precioUnitario: precioUnitarioValue, subtotal }]);
            setTotal((prevTotal) => prevTotal + subtotal);

            // Limpiar los campos después de agregar el producto
            //setCantidad("");
            //setProducto("");
            //setPrecioUnitario("");
        }
    }, [cantidad, producto, precioUnitario]);

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Ventas</h1>
            <div className="input">
                <input
                    className="cantidad"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
                <input
                    className="producto"
                    placeholder="Producto"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                /> <br />
                <input
                    className="precio"
                    name="precio"
                    placeholder="Precio Unitario"
                    value={precioUnitario}
                    onChange={(e) => setPrecioUnitario(e.target.value)}
                />
                <div className="scroll-panel">
                    <table>
                        <thead className="ventas">
                            <tr className="ventas">
                                <th className="ventas">Cantidad</th>
                                <th className="ventas">Producto</th>
                                <th className="ventas">Precio Unitario</th>
                                <th className="ventas">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="ventas">
                            {productos.map((producto, index) => (
                                <tr key={index} className="ventas">
                                    <td className="ventas">{producto.cantidad}</td>
                                    <td className="ventas">{producto.producto}</td>
                                    <td className="ventas">${producto.precioUnitario.toFixed(2)}</td>
                                    <td className="ventas">${producto.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3 className="total">Total: ${total.toFixed(2)}</h3>
                <div className="btns">
                    <button className="btn-finalizar">Finalizar Venta</button>
                    <button className="btn-cancelar">Cancelar Venta</button>
                </div>
            </div>
        </div>
    );
}

export default Ventas;
