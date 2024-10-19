import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './crear-recoleccion.css';
import { iniciarRecoleccion } from '../../lib/actions/crear-orden';

const CrearRecoleccion = () => {
  const [depositos, setDepositos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [selectedDeposito, setSelectedDeposito] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Obtener depósitos y materiales de la API
  useEffect(() => {
    const fetchDepositos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/depositos-comunales/`); // Ajustar la URL de la API si es necesario
        setDepositos(response.data);
      } catch (error) {
        console.error('Error al obtener los depósitos:', error);
      }
    };

    const fetchMateriales = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/materiales/`); // Ajustar la URL de la API si es necesario
        setMateriales(response.data);
      } catch (error) {
        console.error('Error al obtener los materiales:', error);
      }
    };

    fetchDepositos();
    fetchMateriales();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!selectedDeposito || !selectedMaterial || !cantidad) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const material = materiales.find((mat) => mat.id === parseInt(selectedMaterial));
    const deposito = depositos.find((dep) => dep.id === parseInt(selectedDeposito));

    try {
      const caseId = await iniciarRecoleccion(cantidad, material, deposito)

      setMessage(`El nro de caso es el ${caseId}, por favor, presentalo en el deposito!`)

      alert('Recolección creada con éxito');
      navigate('/dashboard'); // Redirige al dashboard u otra página después de crear la recolección
    } catch (error) {
      console.error('Error al crear la recolección:', error);
      alert('Error al crear la recolección.');
    }
  };

  return (
    <div className="create-collection-container">
      <h2>Crear Recolección</h2>
      <form onSubmit={handleSubmit} className="create-collection-form">
        {/* Select para Depósito */}
        <div className="form-group">
          <label htmlFor="deposito">Depósito:</label>
          <select
            disabled={depositos.length === 0}
            id="deposito"
            value={selectedDeposito}
            onChange={(e) => setSelectedDeposito(e.target.value)}
            required
          >
            <option value="">Seleccione un depósito</option>
            {depositos.map((deposito) => (
              <option key={deposito.id} value={deposito.id}>
                {deposito.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select para Material */}
        <div className="form-group">
          <label htmlFor="material">Material:</label>
          <select
            disabled={materiales.length === 0}
            id="material"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            required
          >
            <option value="">Seleccione un material</option>
            {materiales.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input para Cantidad */}
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            min="1"
            placeholder="Ingrese la cantidad"
          />
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="submit-button">
          Crear Recolección
        </button>

        <div>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default CrearRecoleccion;
