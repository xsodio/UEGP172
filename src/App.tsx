import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AlumnoDashboard from './pages/AlumnoDashboard';
import DirectorDashboard from './pages/DirectorDashboard';
import ViceDirectorDashboard from './pages/ViceDirectorDashboard';
import SecretarioDashboard from './pages/SecretarioDashboard';
import AuxiliarDocenteDashboard from './pages/AuxiliarDocenteDashboard';
import AuxiliarLimpiezaDashboard from './pages/AuxiliarLimpiezaDashboard';
import DocenteLayout from './components/DocenteLayout';
import DashboardView from './views/DashboardView';
import MateriasListView from './views/MateriasListView';
import MateriaDetalleView from './views/MateriaDetalleView';

interface User {
  dni: string;
  nombre: string;
  rol: string;
  curso?: string;
  division?: string;
  materia?: string;
  cargo?: string;
  contraseña: string;
  monedas: number;
  ['porcentaje asistencia']?: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Mapeo de roles a rutas (simplificado)
    const routeByRole: Record<string, string> = {
    'Alumno': '/alumno',
    'Docente': '/docente',  //  IMPORTANTE:  Ahora apunta al padre, no al dashboard
    'Profesor': '/docente', //  IMPORTANTE:  Ahora apunta al padre, no al dashboard
    'Director': '/director',
    'Vice Director': '/vice-director',
    'Secretario': '/secretario',
    'Auxiliar Docente': '/auxiliar-docente',
    'Auxiliar de Limpieza': '/auxiliar-de-limpieza'
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbz1DuBKvoJmZtziKc6yuKLn80ibYdLIUjY18ucKhUJUcIC6T-X9-UESc_R4KK1SZ29I6g/exec'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setUsers(json as User[]);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
        // TODO:  Mostrar mensaje de error al usuario
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#6c8499] text-white text-xl">
        Cargando datos...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentUser
              ? <Navigate to={routeByRole[currentUser.rol] || '/login'} replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
        <Route path="/alumno" element={<AlumnoDashboard user={currentUser} onLogout={handleLogout} />} />
        <Route path="/director" element={<DirectorDashboard user={currentUser} onLogout={handleLogout} />} />
        <Route path="/vice-director" element={<ViceDirectorDashboard user={currentUser} onLogout={handleLogout} />} />
        <Route path="/secretario" element={<SecretarioDashboard user={currentUser} onLogout={handleLogout} />} />
        <Route path="/auxiliar-docente" element={<AuxiliarDocenteDashboard user={currentUser} onLogout={handleLogout} />} />
        <Route path="/auxiliar-de-limpieza" element={<AuxiliarLimpiezaDashboard user={currentUser} onLogout={handleLogout} />} />

        {/* Rutas anidadas para Docente */}
        <Route
            path="/docente"
            element={
                currentUser && (currentUser.rol === 'Docente' || currentUser.rol === 'Profesor') ? (
                    <DocenteLayout user={currentUser} onLogout={handleLogout}>
                         <Routes>
                            <Route path="dashboard" element={<DashboardView user={currentUser} />} />
                            <Route path="materias" element={<MateriasListView currentUser={currentUser} />} />
                            <Route path="materias/:materiaId" element={<MateriaDetalleView />} />
                            <Route index element={<Navigate to="dashboard" replace />} />
                         </Routes>
                    </DocenteLayout>
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
