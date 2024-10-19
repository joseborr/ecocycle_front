import { Navigate } from 'react-router-dom';
import { getRolesFromToken, isTokenExpired } from '../lib/auth'; // Importa la función

// Ruta protegida por uno o más grupos de usuario
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRoles = getRolesFromToken();
  
  // Verificar si el token ha expirado
  if (isTokenExpired()) {
    return <Navigate to="/login" />; // Redirige al login si el token ha expirado
  }

  if (!userRoles || userRoles.length === 0) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si alguno de los roles permitidos está en los roles del usuario
  const isAuthorized = allowedRoles.some(role => userRoles.includes(role));

  if (!isAuthorized) {
    return <Navigate to="/" replace/>; // Redirige a una página de error si no está autorizado
  }

  return children;
};

export default ProtectedRoute;
