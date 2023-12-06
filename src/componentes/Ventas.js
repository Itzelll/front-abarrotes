import React, { useState } from "react";
import "./pantallasGerente/style/salesReport.css";
import "./pantallasGerente/style/registroEmp.css";
import "./Ventas.css";
import MenuHamburguesa from './MenuHamburguesa';

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        cantidad: 0,
        producto: "",
        precio: ""
    });


    const calcularSubtotal = (cantidad, precio) => cantidad * precio;

    const calcularTotal = () => {
        return productos.reduce((total, producto) => {
            const precioNumerico = parseFloat(producto.precio);
            return total + (isNaN(precioNumerico) ? 0 : calcularSubtotal(producto.cantidad, precioNumerico));
        }, 0);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prevProducto) => ({
            ...prevProducto,
            [name]: name === "precio" ? value : value
        }));
    };

    const agregarProducto = () => {
        if (nuevoProducto.cantidad && nuevoProducto.producto && nuevoProducto.precio) {
            setProductos((prevProductos) => [...prevProductos, { ...nuevoProducto }]);
            setNuevoProducto({
                cantidad: "",
                producto: "",
                precio: ""
            });
        }
    };

    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Ventas</h1>
            <div className="input">
                <input
                    className="cantidad"
                    placeholder="Cantidad"
                    value={nuevoProducto.cantidad}
                    onChange={handleInputChange}
                />
                <input
                    className="producto"
                    placeholder="Producto"
                    value={nuevoProducto.producto}
                    onChange={handleInputChange}
                /> <br />
                <input
                    className="precio"
                    name="precio"
                    placeholder="Precio Unitario"
                    value={nuevoProducto.precio}
                    onChange={handleInputChange}
                />
                <button className="agregar" onClick={agregarProducto}>Agregar</button>
            </div>
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
                                <td className="ventas">${producto.precio}</td>
                                <td className="ventas">${calcularSubtotal(producto.cantidad, producto.precio)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className="total">Total: ${calcularTotal()}</h3>
            <div className="btns">
                <button className="btn-finalizar">Finalizar Venta</button>
                <button className="btn-cancelar">Cancelar Venta</button>
            </div>
        </div>
    );
}

export default Ventas;
