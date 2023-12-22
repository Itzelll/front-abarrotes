import React from "react";
import { Link } from 'react-router-dom';

const CreateUser = () => {
    return (
        <div className="form-container">
            <h1>Create User</h1>
            <form>
                <label className="label">
                    Usuario:
                    <input
                        className="user"
                        type="text"
                        placeholder="username"
                    />
                </label>
                <br />
                <label className="label">
                    Contraseña:
                    <input
                        className="password"
                        type="password"
                        placeholder="password"
                    />
                </label>
                <br />
                <button className="button" type="button">
                    Crear Usuario
                </button>
                <div className='new-user'><Link to="/login">Ya tengo cuenta</Link></div>
            </form>
        </div>
    );
}

export default CreateUser;