MODELADO DE SISTEMAS

MODELOS DE CASOS DE USO

IDENTIFICACION DE ACTORES


| --- | --- | --- | --- | --- |

| Actor | Descripción / responsabilidad | Nivel |

| Cajero | Es el usuario operativo en cada sede (Ayacucho/Lima). Su función principal es registrar el flujo de dinero diario y realizar el cierre de caja. | Operativo |

| Contador | Se encarga de la auditoría de movimientos y corrección de errores (anulaciones/ediciones). | Táctico |

| Sistemas | Se encarga de la configuración del sistema (cuentas y tipo de cuentas) | mantenimiento |

| Gerente | Es el usuario estratégico. No registra datos, solo necesita de la información procesada para la toma de decisiones. | Estratégico |




PAQUETES

PAQUETE DE SEGURIDAD: aquí entra todo lo referente al control de acceso

CU – 01 iniciar sesión: aquí se valida las credenciales y se detecta la tienda que se le asigno. 

CU – 02 verificar credenciales del usuario (accion de comprobar que un dato coincide con lo esperado)

CU – 03 autenticar usuario (proceso de confirmación)

CU – 03 Detectar tienda del usuario

CU – 03 registrar nuevos usuarios: necesario para que existan responsables. Es para guardar formalmente nuevos datos en el sistema 

CU – 05 validar datos personales (aplicar reglas de negocio a los datos ingresados)

CU – 06 validar contraseña

CU -07 Encriptar contraseña y guardar en BD

PAQUETE DE TESORERIA: todo lo que tiene que ver con movimiento de dinero

CU – 08 Registrar transacción: caso de uso principal. Permite ingresar ingresos y egresos.

un usuario interactúa con el sistema para seleccionar cuentas?

un usuario interactúa con el sistema para seleccionar tipo cuentas?

NO PORQUE AMBOS FORMAN PARTE DEL CASO DE USO REGISTRAR TRANSACCION. ¿El usuario abre el sistema con el objetivo de seleccionar una cuenta? No. La selección ocurre dentro del formulario registro.

CU – 09 consultar cuentas (No pertenece al flujo de registrar transacción)

CU – 10 seleccionar cuenta y tipo de cuenta valido

CU – 11 validar monto positivo (esto lo hace el sistema internamente, no se considera como caso de uso)

CU -12 validar saldo suficiente (de la misma manera que validar monto positivo)

CU – 13 Modificar transacción: editar fecha, monto o concepto de un registro errado.

CU – 14 validar periodo no cerrado

CU – 15 actualizar saldo de cuenta

CU – 16 validar conciliación

CU – 17 Anular transacción: revertir una operación, pero de manera lógica para cuadrar la caja.

CU – registrar motivo anulación

CU – 18 generar transacción inversa 

CU – 19 validar estado no anulado

CU – 20 registrar bitácora 

PAQUETE DE MANTENIMIENTO: gestión de las tablas como cuentas, conceptos

CU – 21 Gestionar cuentas financieras

CU – 22 crear cuentas únicas

CU – 23 modificar cuentas

CU – 24 eliminar cuentas

CU – 25 asignar tipo de cuenta a cuentas (ingreso/egreso)

CU – 26 mostrar cuentas creadas

CU – 27 Gestionar tipo de cuentas financieras

CU – 28 crear tipo de cuenta

CU – 29 modificar tipo de cuenta

CU – 30 eliminar tipo de cuenta 

PAQUETE DE REPORTES E INTELIGENCIA: todo lo que tenga que ver con salida de información.

CU – 31 Consultar estado de cuenta: solo para transacciones por fecha.

CU – 32 Ver extracto de cuenta x: parte de la cuenta, trae sus transacciones

CU – 33 Ver resumen por tipo de cuenta:

CU – 34 Ver balance general: resúmenes de cuentas

CU – 35 Ver liquidez mensual: gráficos puros

CU – 36 Ver proyecciones: tendencia pura

CU – Exportar reportes

MODELO DE CASOS DE USO DEL SISTEMA: Aquí se observa las asociaciones entre actores y casos de uso

DIAGRAMA DE ACTORES

DEPENDENCIA DE PAQUETES y DIAGRAMA DE PAQUETES

ANALISIS DE CASOS DE USO

TRAZABILIDAD DE CASOS DE USO

PRIORIZACION DE CASOS DE USO

CONSTRUCCION DE PROTOTIPOS

CHECKLIST DEL MODELO DE CASOS DE USO