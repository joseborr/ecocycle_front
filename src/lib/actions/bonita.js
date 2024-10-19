import axios from 'axios';

// Base URL y credenciales
const base_url = import.meta.env.VITE_BONITA_URL || 'http://localhost:8080/bonita';
const username = import.meta.env.VITE_BONITA_USERNAME || 'walter.bates';
const password = import.meta.env.VITE_BONITA_PASS || 'bpm';

// Función para autenticar
export const authenticate = async () => {
  const url = '/loginservice';
  const payload = `username=${username}&password=${password}`;
  
  try {
    const response = await axios.post(base_url + url, payload, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true // Permitir el envío de cookies o credenciales
    });
    
    if (response.status === 204) {

      console.log("Autenticación exitosa.");
  
      return '';
    } else {
      throw new Error(`Error de autenticación: ${response.status}`);
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
};

// Obtener el ID del proceso
export const getProcessId = async (processName) => {
  const url = `/API/bpm/process?s=${processName}`;
  
  try {
    const response = await axios.get(`${base_url}${url}`, {
      withCredentials: true,
    });

    
    if (response.data && response.data.length > 0) {
      return response.data[0].id;
    } else {
      throw new Error("No se encontró el proceso.");
    }
  } catch (error) {
    console.error("Error al obtener el ID del proceso:", error);
    throw error;
  }
};

// Iniciar el proceso
export const initProcess = async (processId) => {
  const url = `/API/bpm/process/${processId}/instantiation`;

  try {
    const response = await axios.post(base_url + url, {}, {
      withCredentials: true,
    });
    return response.data?.caseId || null;
  } catch (error) {
    console.error("Error al iniciar el proceso:", error);
    throw error;
  }
};

// Obtener la tarea por caseId
export const getTaskByCase = async (caseId) => {
  const url = `/API/bpm/task?f=caseId=${caseId}`;
  
  try {
    const response = await axios.get(base_url + url, {
      withCredentials: true,
    });
    
    if (response.data.length > 0) {
      return response.data[0].id;
    } else {
      throw new Error("No se encontraron tareas asociadas al caseId.");
    }
  } catch (error) {
    console.error("Error al obtener la tarea por caseId:", error);
    throw error;
  }
};

// Asignar una variable al caso
export const assignVariableByTaskAndCase = async (caseId, variableName, variableValue, variableType) => {
  const url = `/API/bpm/caseVariable/${caseId}/${variableName}`;
  
  try {
    const payload = { type: variableType, value: String(variableValue) };
    const response = await axios.put(base_url + url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.log(`Variable ${variableName} asignada correctamente.`);
    return response.data || null;
  } catch (error) {
    console.error(`Error al asignar la variable ${variableName}:`, error);
    throw error;
  }
};

// Obtener el ID del usuario por nombre de usuario
export const getUserIdByUsername = async () => {
  const url = `/API/identity/user?s=${username}`;

  try {
    const response = await axios.get(base_url + url, {
      withCredentials: true // Permitir el envío de cookies o credenciales
    });
    
    if (response.data.length > 0) {
      return response.data[0].id;
    } else {
      throw new Error("No se encontró el usuario.");
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Asignar usuario a la tarea
export const assignUserToTask = async (taskId, userId) => {
  const url = `/API/bpm/userTask/${taskId}`;
  const payload = { assigned_id: userId };

  try {
    const response = await axios.put(base_url + url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true // Permitir el envío de cookies o credenciales
    });
    return response.data || null;
  } catch (error) {
    console.error("Error al asignar usuario a la tarea:", error);
    throw error;
  }
};

// Completar tarea
export const completeTask = async (taskId) => {
  const url = `/API/bpm/userTask/${taskId}/execution`;

  try {
    const response = await axios.post(base_url + url, {}, {
      withCredentials: true // Permitir el envío de cookies o credenciales
    });
    return response.data || null;
  } catch (error) {
    console.error("Error al completar la tarea:", error);
    throw error;
  }
};
