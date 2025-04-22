import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import logo from "../assets/LOGO.jpg";
import "./Login.css";

const LoginPage = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [excelData, setExcelData] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0].map((header: string) => header.trim().toLowerCase());
          const cleanedData = jsonData.slice(1).map((row: any[]) => {
            return row.reduce((acc, value, index) => {
              acc[headers[index]] = value;
              return acc;
            }, {});
          });

          setExcelData(cleanedData);
          console.log("📥 Excel cargado:", cleanedData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (excelData.length === 0) {
      setError("No se han cargado los datos del Excel. Por favor, sube el archivo Excel.");
      return;
    }

    const userFromExcel = excelData.find((user: any) => {
      const cleanExcelDni = (user.dni?.toString() || "").replace(/\./g, "").trim();
      const cleanInputDni = dni.replace(/\./g, "").trim();
      const cleanExcelPass = (user["contraseña"]?.toString() || "").trim();
      const cleanInputPass = password.trim();
      return cleanExcelDni === cleanInputDni && cleanExcelPass === cleanInputPass;
    });

    if (userFromExcel) {
      setCargando(true); // Mostrar cartel de "Cargando..."

      const cleanedUser = Object.fromEntries(
        Object.entries(userFromExcel).map(([key, value]) => [
          key.trim(),
          typeof value === "string" ? value.trim() : value,
        ])
      );

      cleanedUser.dni = cleanedUser.dni?.toString().replace(/\./g, "").trim();
      cleanedUser.monedas = parseInt(cleanedUser.monedas?.toString().replace(/[^\d]/g, "") || "0", 10);

      console.log("✅ Usuario autenticado:");
      console.table(cleanedUser);

      localStorage.setItem("currentUser", JSON.stringify(cleanedUser));

      // Simula una carga de 5 segundos antes de redirigir
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      {cargando && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center animate-pulse text-lg font-bold text-gray-800">
            🔄 Cargando datos del sistema... por favor espere
          </div>
        </div>
      )}

      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h1 className="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Ingresa tu DNI"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">Ingresar</button>
        </form>
        <div className="forgot-password">
          <a href="mailto:Melchorcristiandaniel1@gmail.com">¿Olvidaste tu contraseña?</a>
          <p>
            O búscame como <strong>Profesor Cristian Melchor</strong> en la escuela.
          </p>
        </div>
      </div>

      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mt-4" />

      <footer className="footer">
        <p>
          Creado por <strong>Prof. Cristian Melchor</strong> DNI 39776943. Todos los derechos reservados.
          Para uso exclusivo en la <strong>EET UEGP N°172 Deolindo Felipe Bittel</strong>.
          Prohibida su venta o distribución. Es de uso gratuito.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
