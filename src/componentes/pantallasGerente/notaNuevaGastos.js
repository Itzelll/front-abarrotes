import React from "react";
import MenuHamburguesa from '../MenuHamburguesa';


const NotaNuevaGastos = () => {
    return (
        <div className="registro">
            <MenuHamburguesa />
            <h1>Nueva Nota de Gastos</h1>

            <p>Cantidad a tomar de la caja: <input className="cantidad-caja" placeholder="Ingresar cantidad"></input></p>
            <p>Motivo de salida del dinero: </p>
            <div className="div-motivo">
                <textarea className="motivo" rows="4" placeholder="Ingresar motivo"></textarea>
            </div>
            <p>Información necesaria</p>
            <div className="div-info">
                <textarea className="info" rows="4" placeholder="Ingresar información"></textarea>
            </div>
            <br />

            <div className="buttons">
                <button className="cancelar">Cancelar</button>
                <button className="guardar">Guardar</button>
            </div>
        </div>
    );
}

export default NotaNuevaGastos;