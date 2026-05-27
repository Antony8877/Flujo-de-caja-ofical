RNF

En fiabilidad:

El sistema debe garantizar la propiedad ACID en todas las transacciones financieras. Si se interrumpe la conexión durante el registro, la operación debe revertirse completamente para evitar datos corruptos.

El sistema debe ser capaz de restaurarse a su ultimo estado estable en un tiempo no mayor a 10 min, utilizando respaldos automáticos. 

En rendimiento:

El tiempo de respuesta para transacciones (guardar el ingreso y el egreso) no debe exceder los 2 segundos bajo una carga normal de trabajo, para mantener la fluidez operativa similar a la aplicación de escritorio anterior. 

La generación de informes y dashboards estratégicos debe completarse en menos de 3 segundos.

En el almacenamiento:

El sistema debe utilizar un gestor de base de datos relacional como PostgreSQL para asegurar la integridad de los datos financieros y la gestión de la concurrencia.

El sistema debe mantener la línea la información del ejercicio fiscal actual. Los datos de años anteriores se archivarán, pero deben permanecer accesibles para cualquier consulta.

En la escalabilidad:

La arquitectura de software debe permitir agregar nuevas sucursales simplemente mediante configuración de datos sin necesidad de reprogramar o detener el servicio. 

El sistema debe soportar el trabajo simultaneo de al menos 50 usuarios (considerando la expansión futura) sin degradación del rendimiento.

En la disponibilidad

El sistema debe estar disponible la mayor parte del tiempo 24/7 durante el horario de trabajo.

En la seguridad

El sistema debe garantizar la seguridad. Toda comunicación en las tiendas y el servidor en la nube debe estar cifrada mediante el protocolo HTTPS (TLS 1.2 o superior)

Las contraseñas deben almacenarse mediante hash. El sistema debe registrar en una bitácora cada acción crítica: quién modificó, qué y cuando lo hizo.

En la privacidad:

El sistema debe implementar reglas estrictas de visibilidad. Un usuario con determinado rol no debe tener acceso técnico (ni por API ni por interfaz) a los registros financieros de la tienda 2.

En la usabilidad (vencer la resistencia al cambio)

La interfaz gráfica debe adaptarse automáticamente a pantallas de escritorio y dispositivos móviles.

El sistema debe ser mantener la misma lógica conceptual (concepto -> monto -> guardar) para que la curva de aprendizaje sea menor a 2 días.

Las tareas mas frecuentes  deben realizarse en un máximo de 3 clics o con atajos de teclado.