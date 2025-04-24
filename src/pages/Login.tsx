import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.jpg";
import "./Login.css";

const LoginPage = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true); // Mostrar cartel de "Cargando..."

    try {
      const response = await fetch("/.netlify/functions/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni: dni.replace(/\./g, "").trim(), password: password.trim(), rol: 'alumno' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Usuario autenticado:", data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setError(data.error || "Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error: any) {
      setError(error.message || "Error al conectar con el servidor.");
    } finally {
      setCargando(false); // Ocultar cartel de "Cargando..."
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
