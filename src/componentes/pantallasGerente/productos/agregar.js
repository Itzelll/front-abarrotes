// CreateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHamburguesa from './MenuHamburguesa';

const CreateProduct = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');  // Nuevo estado para la categoría seleccionada
    const [marcas, setMarcas] = useState([]);  // Nuevo estado para almacenar la lista de marcas
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');  // Nuevo estado para la marca seleccionada
    const [unidadMedidas, setUnidadMedidas] = useState([]);
    const [unidadMedidaSeleccionada, setUnidadMedidaSeleccionada] = useState('');  // Nuevo estado para la unidad de medida seleccionada

    const handleCreate = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/productos', {
                codigo,
                nombre,
                cantidad,
                categoria: categoriaSeleccionada,  // Utilizar la categoría seleccionada
                marca: marcaSeleccionada,  // Utilizar la marca seleccionada
                unidadMedida: unidadMedidaSeleccionada,
            });
            console.log('Producto creado:', response.data);
            // Puedes actualizar la lista de productos después de la creación
        } catch (error) {
            console.error('Error al crear producto', error);
        }
    };

    // Obtener la lista de marcas al cargar el componente
    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/marcas');
                setMarcas(response.data);
            } catch (error) {
                console.error('Error al obtener marcas', error);
            }
        };

        fetchMarcas();
    }, []);

    // Obtener la lista de categorías al cargar el componente
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías', error);
            }
        };

        fetchCategorias();
    }, []);

    // Obtener la lista de unidades de medida al cargar el componente
    useEffect(() => {
        const fetchUnidadMedidas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/unidadesMedida');
                setUnidadMedidas(response.data);
            } catch (error) {
                console.error('Error al obtener unidades de medida', error);
            }
        };

        fetchUnidadMedidas();
    }
    , []);

    return (
        <div>
            <MenuHamburguesa />
            <h2>Crear Producto</h2>
            <input
                type="text"
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />
            {/* Listas desplegables */}
            <br />
            <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
            <br />
            <select
                value={marcaSeleccionada}
                onChange={(e) => setMarcaSeleccionada(e.target.value)}
            >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                        {marca.nombre}
                    </option>
                ))}
            </select>
            <br />
            <select
                value={unidadMedidaSeleccionada}
                onChange={(e) => setUnidadMedidaSeleccionada(e.target.value)}
            >
                <option value="">Selecciona una unidad de medida</option>
                {unidadMedidas.map((unidadMedida) => (
                    <option key={unidadMedida.id} value={unidadMedida.id}>
                        {unidadMedida.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleCreate}>Agregar</button>
        </div>
    );
};

export default CreateProduct;
