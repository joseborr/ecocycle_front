import {
  authenticate,
  getProcessId,
  initProcess,
  getTaskByCase,
  assignVariableByTaskAndCase,
  getUserIdByUsername,
  assignUserToTask,
  completeTask,
} from "./bonita";

export async function iniciarRecoleccion(cantidad, material, deposito) {
  const clientToken = localStorage.getItem('token');
  await authenticate();

  // 2. Obtengo el ID del proceso de la orden
  const process_id = await getProcessId("Recoleccion");

  // 3. Instancio el proceso
  const case_id = await initProcess(process_id);

  // 5. Busco la actividad por caso
  const task_id = await getTaskByCase(case_id);

  // 6. Asigno las variables de la actividad
  await assignVariableByTaskAndCase(
    case_id,
    "material",
    material.name,
    "java.lang.String"
  );
  await assignVariableByTaskAndCase(
    case_id,
    "material_id",
    material.id,
    "java.lang.Integer"
  );
  await assignVariableByTaskAndCase(
    case_id,
    "cantidad",
    parseInt(cantidad),
    "java.lang.Integer"
  );
  await assignVariableByTaskAndCase(
    case_id,
    "deposito",
    deposito.name,
    "java.lang.String"
  );
  await assignVariableByTaskAndCase(
    case_id,
    "deposito_id",
    deposito.id,
    "java.lang.Integer"
  );
  await assignVariableByTaskAndCase(
    case_id,
    "token",
    clientToken,
    "java.lang.String"
  );

  // 7. Obtengo el userId del usuario por username
  const user_id = getUserIdByUsername();

  // 8. Asigno la actividad al usuario
  assignUserToTask(task_id, user_id);

  // 9. Completo la actividad asi avanza el proceso
  completeTask(task_id);

  return case_id;
}
