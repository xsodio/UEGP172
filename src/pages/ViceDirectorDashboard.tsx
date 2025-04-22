import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardCheck, AlertCircle, FileSearch, LogOut } from 'lucide-react';

const ViceDirectorDashboard = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4 font-['Roboto']">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Panel del Vice Director</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>

        <p className="text-lg text-gray-700 mb-6">Bienvenido, <strong>{user?.nombre}</strong></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card icon={<Users />} title="Control de alumnado" />
          <Card icon={<ClipboardCheck />} title="Asistencias y ausencias" />
          <Card icon={<AlertCircle />} title="Seguimiento disciplinario" />
          <Card icon={<FileSearch />} title="Revisión de informes" />
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          © 2025 UEGP N°172 - Gestión Vice Dirección
        </p>
      </div>
    </div>
  );
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ icon, title }) => (
  <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition cursor-pointer">
    <div className="text-blue-600">{icon}</div>
    <div className="text-gray-800 font-semibold">{title}</div>
  </div>
);

export default ViceDirectorDashboard;
