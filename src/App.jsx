import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from "./pages/login/login";
import CrearRecoleccion from "./pages/crear-recoleccion/crear-recoleccion";
import ActualizarRecoleccion from "./pages/actualizar-recoleccion";
import CrearReserva from "./pages/crear-reserva";
import ProtectedRoute from "./components/protected-route";
import Home from "./pages/home";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/nueva-recoleccion">Crear recoleccion</Link></li>
          <li><Link to="/actualizar-recoleccion">Actualizar recoleccion</Link></li>
          <li><Link to="/nueva-reserva">Crear reserva</Link></li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Ruta protegida para el grupo recolector */}
          <Route
            path="/nueva-recoleccion"
            element={
              <ProtectedRoute allowedRoles={["Recolector"]}>
                <CrearRecoleccion />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para el grupo empleado */}
          <Route
            path="/actualizar-recoleccion"
            element={
              <ProtectedRoute allowedRoles={["Empleado"]}>
                <ActualizarRecoleccion />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para el grupo fabricante */}
          <Route
            path="/nueva-reserva"
            element={
              <ProtectedRoute allowedRoles={["Fabricante"]}>
                <CrearReserva />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
