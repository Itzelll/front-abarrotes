import './style/AgregarEmpleado.css';
import MenuHamburguesa from '../MenuHamburguesa';
import React, { useState, useEffect } from 'react';

const AgregarEmpleado = () => {

    const [empleado, setEmpleado] = useState({
        nombre: '',
        apellidos: '',
        contrasenia: '',
        idRol: ''
    });

    const [userRole, setUserRole] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmpleado({ ...empleado, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Antes de la llamada a fetch:', empleado);
            const response = await fetch('http://localhost:8080/api/empleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado)
            });
            console.log('Después de la llamada a fetch:', response);

            if (response.ok) {
                console.log('Empleado agregado correctamente');
                // Puedes redirigir o hacer otras acciones después de agregar el empleado
            } else {
                console.error('Error al agregar el empleado:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        console.log('userRole en AgregarEmpleado:', userRole);
    };

    useEffect(() => {
        // Modificación 2: Parsear el rol al cargar el componente
        const storedRole = localStorage.getItem('userRole');
        console.log('Stored Role:', storedRole);

        const parsedRole = storedRole ? JSON.parse(storedRole) : null;
        console.log('Parsed Role:', parsedRole);

        setUserRole(parsedRole);
    }, []);

    return (
        <div className="contenedor">
            <MenuHamburguesa />
            <h1>Agregar Empleado</h1>
            {userRole && userRole.rol && userRole.rol.includes("Encargado_Departamento") ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            className="datos"
                            name="nombre"
                            value={empleado.nombre}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Apellidos:
                        <input
                            type="text"
                            className="datos"
                            name="apellidos"
                            value={empleado.apellidos}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Contraseña
                        <input
                            type="password"
                            className="datos"
                            name="contrasenia"
                            value={empleado.contrasenia}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        ID Rol:
                        <input
                            type="text"
                            className="datos"
                            name="idRol"
                            value={empleado.idRol}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='submit' className='confirmar'>Confirmar</button>
                </form>
            ) : (
                <p>No tienes permisos para agregar empleados.</p>
            )}
        </div>
    );
};

export default AgregarEmpleado;
