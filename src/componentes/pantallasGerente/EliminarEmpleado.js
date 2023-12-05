import './style/AgregarEmpleado.css';
import './style/EliminarEmpleado.css';
import MenuHamburguesa from '../MenuHamburguesa';

const EliminarEmpleado = () => {
    return (
        <div className='contenedor'>
            <h1>Eliminar Empleado</h1>
            <MenuHamburguesa />
            <form>
                
                <input placeholder="buscar empleado" className="buscador"></input><br />

                <label>
                    ID:
                    <input type="text" className="datos" />
                </label>
                <label>
                    Nombre:
                    <input type="text" className="datos" />
                </label>
                <label>
                    Apellidos:
                    <input type="text" className="datos" />
                </label>
                <label>
                    Contraseña:
                    <input type="password" className="datos" />
                </label>
                <label>
                    ID Rol:
                    <input type="text" className="datos" />
                </label>

                <button className="eliminar">Eliminar</button>
            </form>
        </div>
    );
}

export default EliminarEmpleado;