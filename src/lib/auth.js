import { jwtDecode } from 'jwt-decode';


// Verifica si el token ha expirado
export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
};

// Obtener roles del token
export const getRolesFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.groups || [];
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return [];
  }
};
