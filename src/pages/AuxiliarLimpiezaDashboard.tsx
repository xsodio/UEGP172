import React from 'react';
import { ClipboardList, LogOut } from 'lucide-react';
import { FaBroom } from 'react-icons/fa';

interface AuxiliarLimpiezaDashboardProps {
  user: {
    nombre: string;
    dni: string;
    cargo?: string;
  } | null;
  onLogout: () => void;
}

const AuxiliarLimpiezaDashboard: React.FC<AuxiliarLimpiezaDashboardProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 py-10 px-4 font-['Roboto']">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel del Auxiliar de Limpieza</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Bienvenido, {user.nombre}</h2>
            <p className="text-sm text-gray-600">DNI: {user.dni}</p>
            <p className="text-sm text-gray-600">{user.cargo || 'Auxiliar de Limpieza'}</p>
          </div>

          <div className="bg-yellow-50 shadow-md rounded-xl p-6 flex flex-col gap-4 justify-center items-center text-center">
            <FaBroom className="w-8 h-8 text-yellow-700" />
            <h3 className="text-lg font-bold text-yellow-800">Zonas de limpieza</h3>
            <p className="text-sm text-gray-600">Consulta tu sector y horario asignado con el director o vice.</p>
          </div>

          <div className="bg-yellow-50 shadow-md rounded-xl p-6 flex flex-col gap-4 justify-center items-center text-center">
            <ClipboardList className="w-8 h-8 text-yellow-700" />
            <h3 className="text-lg font-bold text-yellow-800">Registro de tareas realizadas</h3>
            <p className="text-sm text-gray-600">Marca tus tareas diarias para mantener un historial de limpieza.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Funciones frecuentes</h3>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Limpieza de aulas, pasillos y baños</li>
              <li>Revisión de insumos (jabón, papel, etc.)</li>
              <li>Informe de desperfectos o roturas</li>
              <li>Colaboración en actos y eventos escolares</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliarLimpiezaDashboard;
