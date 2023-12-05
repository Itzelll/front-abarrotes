import './style/AgregarEmpleado.css';
import MenuHamburguesa from '../MenuHamburguesa';

const AgregarEmpleado = () => {
    return (
        <div className="contenedor">
            <MenuHamburguesa />
            <h1>Agregar Empleado</h1>
            <form>
                <label>
                    Nombre:
                    <input type="text" className="datos" />
                </label>
                <br />
                <label>
                    Apellidos:
                    <input type="text" className="datos" />
                </label>
                <br />
                <label>
                    Contraseña
                    <input type="password" className="datos" />
                </label>
                <br />
                <label>
                    ID Rol:
                    <input type="text" className="datos" />
                </label>
                <br />
                <button className='confirmar'>Confirmar</button>
            </form>
        </div>
    );
};

export default AgregarEmpleado;