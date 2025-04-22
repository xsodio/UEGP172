import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  PlusCircle,
  CheckSquare,
  CalendarPlus,
  BarChart2,
  ThumbsUp,
  FileText,
  ClipboardList,
  PieChart,
  LogOut,
} from 'lucide-react';

interface User {
  nombre: string;
  rol: string;
}

interface Props {
  user: User | null;
  onLogout: () => void;
}

const DocenteDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-['Roboto']">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-[#2f4a63] mb-6">Panel del Docente</h1>
        <p className="mb-8 text-gray-700">Bienvenido, <strong>{user.nombre}</strong>. Seleccione una acción para comenzar.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <OptionCard icon={<Users />} title="Ver alumnos por curso" />
          <OptionCard icon={<PlusCircle />} title="Agregar o quitar monedas" />
          <OptionCard icon={<CheckSquare />} title="Registrar asistencia" />
          <OptionCard icon={<CalendarPlus />} title="Crear tareas con fecha" />
          <OptionCard icon={<BarChart2 />} title="Ranking de alumnos" />
          <OptionCard icon={<ThumbsUp />} title="Reportar comportamiento" />
          <OptionCard icon={<FileText />} title="Observaciones privadas" />
          <OptionCard icon={<ClipboardList />} title="Cargar calificaciones" />
          <OptionCard icon={<PieChart />} title="Crear encuestas o votaciones" />
          <div
            onClick={onLogout}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 p-4 rounded-xl shadow transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          © 2025 UEGP N°172 - Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ icon, title }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer flex items-center gap-4">
    <div className="text-[#2f4a63]">{icon}</div>
    <div className="font-semibold text-gray-800">{title}</div>
  </div>
);

export default DocenteDashboard;
