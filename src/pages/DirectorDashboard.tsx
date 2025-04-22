import React from 'react';
import { FaBook, FaChalkboardTeacher, FaUserGraduate, FaClipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface DirectorDashboardProps {
  user: {
    nombre: string;
  } | null;
}

const DirectorDashboard: React.FC<DirectorDashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8 font-['Roboto']">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Panel del Director</h1>
        <p className="text-xl text-gray-600 mt-2">Bienvenido, {user.nombre}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg rounded-lg p-6 hover:scale-105 transition">
          <FaBook className="text-4xl text-white mx-auto" />
          <h3 className="text-xl text-white text-center font-semibold mt-4">📚 Académico</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver alumnos por curso</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver calificaciones</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver inasistencias</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Control de boletines</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Seguimiento de materias</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver docentes asignados</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Horarios de clases</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Cambios de horario</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 shadow-lg rounded-lg p-6 hover:scale-105 transition">
          <FaChalkboardTeacher className="text-4xl text-white mx-auto" />
          <h3 className="text-xl text-white text-center font-semibold mt-4">👨‍🏫 Personal</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver lista de docentes</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Asistencias docentes</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Licencias y reemplazos</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Solicitudes de permisos</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Llegadas tarde</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg rounded-lg p-6 hover:scale-105 transition">
          <FaUserGraduate className="text-4xl text-white mx-auto" />
          <h3 className="text-xl text-white text-center font-semibold mt-4">🧑‍🎓 Alumnos</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white hover:text-yellow-300 cursor-pointer">Ver legajos</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Registro de disciplina</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Notificaciones a padres</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Casos de seguimiento</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg rounded-lg p-6 hover:scale-105 transition">
          <FaClipboard className="text-4xl text-white mx-auto" />
          <h3 className="text-xl text-white text-center font-semibold mt-4">📋 Administrativo</h3>
          <ul className="mt-2 space-y-1">
            <li className="text-white hover:text-yellow-300 cursor-pointer">Matrícula general</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Estadísticas de asistencia</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Cantidad de egresados</li>
            <li className="text-white hover:text-yellow-300 cursor-pointer">Altas y bajas docentes</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default DirectorDashboard;
