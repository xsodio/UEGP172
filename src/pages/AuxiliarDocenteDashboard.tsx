import React from 'react';
import { ClipboardList, UserCheck, LogOut } from 'lucide-react';

interface AuxiliarDocenteDashboardProps {
  user: {
    nombre: string;
    dni: string;
    cargo?: string;
  } | null;
  onLogout: () => void;
}

const AuxiliarDocenteDashboard: React.FC<AuxiliarDocenteDashboardProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 via-white to-green-50 py-10 px-4 font-['Roboto']">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel del Auxiliar Docente</h1>
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
            <p className="text-sm text-gray-600">{user.cargo || 'Auxiliar Docente'}</p>
          </div>

          <div className="bg-green-50 shadow-md rounded-xl p-6 flex flex-col gap-4 justify-center items-center text-center">
            <ClipboardList className="w-8 h-8 text-green-700" />
            <h3 className="text-lg font-bold text-green-800">Tareas asignadas</h3>
            <p className="text-sm text-gray-600">Consultar al director o vice para verificar tus responsabilidades diarias.</p>
          </div>

          <div className="bg-green-50 shadow-md rounded-xl p-6 flex flex-col gap-4 justify-center items-center text-center">
            <UserCheck className="w-8 h-8 text-green-700" />
            <h3 className="text-lg font-bold text-green-800">Registro de apoyo a docentes</h3>
            <p className="text-sm text-gray-600">Podés asistir en tareas pedagógicas y registrar incidencias.</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Acciones comunes</h3>
            <ul className="text-gray-600 text-sm list-disc list-inside">
              <li>Apoyo a alumnos en clase</li>
              <li>Colaboración con planificación</li>
              <li>Asistencia en actividades especiales</li>
              <li>Comunicación con preceptores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliarDocenteDashboard;
