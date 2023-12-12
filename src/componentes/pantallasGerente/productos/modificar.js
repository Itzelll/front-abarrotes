// UpdateProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import MenuHamburguesa from './MenuHamburguesa';

const UpdateProduct = ({ productId }) => {
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/productos/${productId}`, {
        nombre: nuevoNombre,
      });
      console.log('Producto actualizado:', response.data);
      // Puedes actualizar la lista de productos después de la actualización
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  };

  return (
    <div>
        <MenuHamburguesa />
      <h2>Actualizar Producto</h2>
      <input
        type="text"
        placeholder="Nuevo Nombre del Producto"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
      />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default UpdateProduct;
