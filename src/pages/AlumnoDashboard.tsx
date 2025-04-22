import React, { useEffect } from "react";
import { LogOut, User, Coins, ClipboardList, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlumnoDashboardProps {
  user: { [key: string]: any } | null;
  onLogout: () => void;
}

const AlumnoDashboard: React.FC<AlumnoDashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // 🧽 LIMPIEZA del campo de asistencia
  const porcentajeRaw = user["porcentaje asistencia"] || user["Porcentaje asistencia"] || "0";
  let asistenciaValida = 0;

  if (typeof porcentajeRaw === "string") {
    const limpio = porcentajeRaw.replace("%", "").replace(",", ".").trim();
    asistenciaValida = parseFloat(limpio);
    if (asistenciaValida <= 1) asistenciaValida *= 100;
  } else if (typeof porcentajeRaw === "number") {
    asistenciaValida = porcentajeRaw <= 1 ? porcentajeRaw * 100 : porcentajeRaw;
  }

  if (isNaN(asistenciaValida)) asistenciaValida = 0;

  const porcentajeFormateado = asistenciaValida.toLocaleString("es-AR", {
    style: "decimal",
    maximumFractionDigits: 1,
  });

  // 🔴 Mensaje según nivel de asistencia
  let mensajeAsistencia = "";
  let colorAsistencia = "";

  if (asistenciaValida < 70) {
    mensajeAsistencia = "⚠️ Riesgo de quedar libre. Hablar con el preceptor.";
    colorAsistencia = "text-red-600";
  } else if (asistenciaValida < 80) {
    mensajeAsistencia = "🟡 Cuidar las faltas. En riesgo de quedar libre.";
    colorAsistencia = "text-yellow-600";
  } else if (asistenciaValida < 90) {
    mensajeAsistencia = "🟢 Alumno regular. Buena asistencia.";
    colorAsistencia = "text-green-600";
  } else {
    mensajeAsistencia = "✅ Excelente asistencia.";
    colorAsistencia = "text-emerald-700";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 font-['Roboto']">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <User className="w-7 h-7" />
            Panel del Alumno
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>

        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
            <h2 className="text-lg font-bold text-gray-700">📄 Información del Alumno</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>DNI:</strong> {user.dni}</p>
            <p><strong>Curso y División:</strong> {user.curso || "-"}º {user.division || "-"}</p>
            <p><strong>Materia:</strong> {user.materia || "General"}</p>
            <p><strong>Cargo:</strong> {user.cargo || "Alumno"}</p>
            <p><strong>Rol:</strong> {user.rol || "-"}</p>
          </div>

          {/* Monedas */}
          <div className="bg-yellow-100 rounded-xl shadow-md p-6 text-center">
            <h2 className="text-lg font-bold text-yellow-800 flex justify-center items-center gap-2">
              <Coins className="w-5 h-5" /> Monedas Acumuladas
            </h2>
            <p className="text-3xl font-bold text-yellow-700 mt-2">
              {user.monedas || 0}
            </p>
          </div>

          {/* Asistencia */}
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2 text-center">
            <h2 className="text-lg font-bold text-blue-800 flex justify-center items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Asistencia
            </h2>
            <p className={`text-4xl font-extrabold ${colorAsistencia}`}>
              {porcentajeFormateado}%
            </p>
            <p className={`mt-2 text-sm ${colorAsistencia}`}>{mensajeAsistencia}</p>
          </div>

          {/* Info general */}
          <div className="bg-gray-50 rounded-xl shadow-inner p-4 text-center md:col-span-2 text-sm text-gray-600">
            <FileText className="w-4 h-4 inline-block mr-1" />
            Este panel es una vista general de tu perfil en el sistema escolar. Para cualquier duda, consultá con el preceptor.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoDashboard;
