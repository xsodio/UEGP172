import React, { useState, useEffect } from 'react';
import './InicioDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaSchool } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LogoAnimation = () => {
  return (
    <motion.div
      className="logo-animation mb-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FaSchool className="text-blue-600 w-24 h-24 mx-auto" />
    </motion.div>
  );
};

const InicioDashboard = () => {
  const [vacantes, setVacantes] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setVacantes((prev) => (prev > 0 ? prev - 1 : 0));
    }, 2000); // Simulación cada 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 font-['Roboto']">
      <div className="max-w-3xl mx-auto text-center">
        <LogoAnimation />

        <h1 className="text-3xl font-bold text-[#2f4a63] mb-4">Bienvenidos a la Institución Técnica N°172</h1>
        <p className="text-gray-700 mb-4">
          Nuestra institución ofrece educación técnica de calidad en Electromecánica. Estamos comprometidos con la formación integral de los estudiantes.
        </p>
        <p className="text-gray-700 mb-8">
          ¡Preinscripciones abiertas para el ciclo lectivo 2026! No pierdas la oportunidad de formar parte de nuestra comunidad.
        </p>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vacantes disponibles</h2>
          <p className="text-4xl font-bold text-blue-600">{vacantes}</p>
        </div>

        <button
          onClick={() => navigate('/preinscripcion')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition mb-8"
        >
          Preinscribirse para el 2026
        </button>

        <div className="text-sm text-gray-500">
          <p>📧 Contacto: <a href="mailto:contacto@institucion.com" className="text-blue-600 underline">contacto@institucion.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default InicioDashboard;
