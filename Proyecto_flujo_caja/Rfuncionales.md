REQUISITOS FUNCIONALES Y NO FUNCIONALES

MODULO DE SEGURIDAD Y ACCESO (SIN ESTO NO HAY SISTEMA)


| --- | --- | --- | --- | --- |

| ID | Requisito funcional | Prioridad | Justificación |

| RF - 01 | El sistema debe proporcionar un formulario de registro accesible desde la pantalla de Login (es como un tipo enlace que diga: ¿No tienes cuenta? Regístrate) | MUST | Necesario para que existan responsables. |

| RF - 02 | El formulario debe contener campos como: nombre completo, DNI, tienda, contraseña y confirmar contraseña | MUST | Aquí se instancia a la persona que quiera tener una cuenta |

| RF – 03 | El sistema debe validar el DNI que esta previamente en la base de datos | MUST |  |

| RF – 04 | El sistema debe permitir que la contraseña cumpla con una política de seguridad (mínimo 6 caracteres, al menos una mayúscula y un número) | MUST |  |

| RF – 05 | El sistema debe comprobar que “contraseña” y “confirmar contraseña” deben ser idénticos | MUST |  |

| RF – 06 | Si la validación es exitosa, el sistema debe guardar los datos en la base de datos con la contraseña encriptada (hasheada) | MUST |  |

| RF – 07 | Si ocurre algún error, el sistema debe mostrar un mensaje de error especifico sin borrar los campos ya rellenados (excepto la contraseña por seguridad) | MUST |  |

| RF – 08 | El sistema debe controlar el acceso mediante autenticación (usuario y contraseña). Vale decir, permitir proporcionar un formulario con campos para “usuario” y “contraseña” | MUST | Seguridad básica. Nadie entra sin esto. |

| RF – 09 | El campo “contraseña” debe ocultar los caracteres ingresados (mostrar *) | MUST | Seguridad personal de cada cuenta |

| RF – 10 | El sistema debe validar que los campos no estén vacíos al enviar el formulario. | MUST | Importante para el ingreso al sistema |

| RF – 11 | El sistema debe verificar que el par "Usuario/Contraseña" coincida con un registro en la Base de Datos. | MUST | Importante que la contraseña hasheada sea igual a la contraseña almacenada al momento de crear la cuenta |

| RF – 12 | Si la credencial es correcta, el sistema debe redirigir al usuario a la pantalla principal. Vale decir, El sistema debe permitir la navegación hacia módulos de transacciones, cuentas y tipo de cuentas | MUST | Navegabilidad básica |

| RF – 13 | Si las credenciales son invalidas. El sistema debe mostrar un mensaje de error: “contraseña o usuario inválidos” | MUST | Seguridad básica |

| RF – 14 | Por razones de seguridad, el sistema no debe especificar si el error está en el "usuario" o en la "contraseña". Es solo un mensaje genérico. | MUST | Por x razones puede haber un intento de robo de información. |

| RF – 15 | El sistema debe permitir asociar a cada usuario con una tienda específica, de modo que solo pueda registrar y ver movimientos de su tienda. | MUST | Crítico para el modelo de negocio (Ayacucho vs Lima). |




MODULO DE TESORERIA/TRANSACCIONES 


| --- | --- | --- | --- | --- |

| ID | Requisito Funcional | Prioridad | Justificación |

| RF-16 | El sistema debe proporcionar un formulario para registrar transacciones con los campos: fecha, tipo de cuenta, cuenta, concepto, monto. | MUST | Es la función principal del software. Y además es la base del formulario de entrada. |

| RF-17 | El sistema debe validar que el monto a introducir en el formulario de transacciones sea un número mayor que cero | MUST | Evitar montos negativos o nulos |

| RF-18 | El sistema debe validar que la cuenta seleccionada exista (que ha sido creado anticipadamente) y además pertenezca al usuario logueado. | MUST | Seguridad y consistencia |

| RF-19 | El sistema debe validar que el concepto no exceda los 255 caracteres | MUST | Limpieza de datos |

| RF-20 | El sistema debe asignar automáticamente al registro: el usuario que crea la transacción y la tienda actual del usuario. | MUST | Trazabilidad (sabemos quién fue y donde hizo la transacción) |

| RF-21 | Si la transacción es un egreso, el sistema debe verificar que la cuenta tenga saldo suficiente (saldo >= monto) antes de guardar | MUST | Evitar sobregiros y descuadres de caja |

| RF-22 | Si la validación de saldo falla (egreso sin fondos), el sistema debe mostrar un mensaje de advertencia y no guardar la transacción. | MUST | Proteger la integridad financiera |

| RF-23 | El sistema debe actualizar el saldo de la cuenta en tiempo real inmediatamente después de guardar la transacción | MUST | El saldo siempre debe reflejar los movimientos |

| RF-24 | El sistema debe generar un ID único para cada transacción registrada | MUST | Identificador único para referencias futuras |

| RF-25 | El sistema debe permitir registrar transacciones con fecha anterior a la fecha actual (transacciones pasadas) siempre que no afecten periodos cerrados | COULD | Para cuando olvidaron registrar algo |

| RF-26 | El sistema debe permitir al usuario seleccionar una transacción existente y acceder a un modo de edición con los campos precargados con los datos actuales | MUST | El error humano es inevitable. Si no pueden corregir, dejarán de usar el sistema. |

| RF-27 | El sistema debe permitir modificar los campos: concepto, monto y fecha | MUST | Son los datos variables de una transacción |

| RF-28 | El sistema NO debe permitir modificar el campo TIPO (ingreso/egreso) ni la cuenta origen después de creada la transacción | MUST | Cambiar de cuenta o tipo equivale a borrar y crear otra |

| RF-29 | El sistema debe validar que el nuevo monto (si se modifica) sea mayor que cero | MUST | Misma regla que al crear |

| RF-30 | Si se modifica el monto de un egreso, el sistema debe recalcular el saldo considerando la diferencia: (nuevo monto – monto anterior) y validar que la cuenta tenga saldo suficiente para cubrir el incremento | MUST |  |

| RF-31 | Si se modifica la fecha y la nueva fecha pertenece a un periodo contable ya cerrado (mes cerrado), el sistema debe bloquear la edición y mostrar mensaje: “no puedes mover transacciones a un mes cerrado” | MUST | Integridad contable. Lo cerrado no se debe tocar |

| RF-32 | El sistema debe registrar en una bitácora o log quien edito la transacción, en qué fecha y cuáles fueron los valores anteriores y nuevos | SHOULD | AUDITORIA: saber qué cambio y quien lo hizo |

| RF-33 | Al guardar la edición, el sistema debe recalcular y actualizar los saldos de la cuenta afectada (deshacer el efecto del monto anterior y aplicar uno nuevo) | MUST | El saldo siempre debe ser CONSISTENTE |

| RF-34 | Si la transacción editada esta conciliada (marcada como revisada/conciliada), el sistema debe advertir: “esta transacción a fue conciliada, seguro que deseas editarla” y requerir confirmación | SHOULD | Evita modificaciones accidentales |

| RF-35 | El sistema debe permitir al usuario seleccionar una transacción existente y ejecutar la acción “Anular”. | MUST | Función base |

| RF-36 | El sistema debe cambiar su estado a “Anulada” y conservar todos los datos para la auditoria. Vale decir, el sistema no debe permitir la eliminación física de la base de datos cuando se anula una transacción | MUST | En tesorería nada se borra, todo se queda trazado. |

| RF-37 | Al anular una transacción, el sistema debe generar automáticamente una transacción inversa. Claro, si la transacción original era ingreso y estas anulando ese proceso, el sistema debe generar el proceso inverso, o sea el egreso en la misma cuenta |  | Es la forma de revertir sin perder el histórico |

| RF-38 | La transacción generada por la anulación debe tener: fecha, concepto, referencia al ID de la transacción original. |  |  |

| RF-39 | El sistema debe actualizar el saldo de la cuenta aplicando el efecto de la transacción inversa (devolviendo dinero si era egreso, o quitándolo si era ingreso) | MUST | El sueldo debe reflejar la anulación |

| RF-40 | El sistema debe marcar la transacción original con estado “anulada” y vincularla a la nueva transacción generada (relación bidireccional) | MUST | Saber qué anulo a qué |

| RF-41 | El sistema no debe permitir anular una transacción que ya fue conciliada sin una autorización especial | SHOULD | Lo conciliado requiere más cuidado |

| RF-42 | El sistema no debe permitir anular una transacción que ya fue anulada previamente | MUST | No se anula dos veces lo mismo |

| RF-43 | Si la transacción original pertenece a un periodo cerrado el sistema debe bloquear la anulación | MUST | No se modifica lo cerrado |

| RF-44 | El sistema debe registrar en la bitácora quién anulo, cuándo y qué transacción generó. | SHOULD | Auditoria |




MODULO DE MANTENIMIENTO (CUENTAS Y TIPOS)


| --- | --- | --- | --- | --- |

| ID | Requisito funcional | Prioridad | Justificación |

| RF-45 | El sistema debe tener precargadas las cuentas financieras predefinidas para cada tienda. Estas cuentas deben ser creadas por el ingeniero de sistemas en la configuración inicial | MUST | Estas cuentas vienen preconfiguradas |

| RF-46 | El sistema debe permitir a cada cuenta asignar un tipo:Las cuentas que representan entradas de dinero = ingreso.Las cuentas que representan salida de dinero = egreso. | MUST |  |

| RF-47 | El sistema no debe permitir al usuario final crear, editar, eliminar cuentas | MUST | EL usuario solo utiliza las cuentas predefinidas, no las mantiene. |

| RF-48 | El sistema debe mostrar solamente las cuentas activas en los formularios de transacciones | MUST | UX: el usuario solo ve lo que puede usar. |

| RF-49 | Si por algún motivo de negocio se requiere una nueva cuenta, modificar o eliminar alguna existente, debe hacerlo el ingeniero de sistemas mediante acceso directo a base de datos o backoffice exclusivo para administradores del sistema | SHOULD | Control centralizado de la configuración |

| RF-50 | El sistema debe permitir al usuario consultar el listado de cuentas disponibles (solo lectura), idealmente con su tipo y saldo actual. | SHOULD | El sistema necesita saber qué cuentas existen, pero no modificarlas |

| RF-51 | El sistema debe tener precargados únicamente 2 tipos de cuenta: ingreso y egreso | MUST | Según a los requerimientos de la empresa no hay más tipos |

| RF-52 | El sistema no debe permitir al usuario final crear, editar ni eliminar tipos de cuenta | MUST | Son fijos |

| RF-53 | Los tipos “ingreso”, “egreso” si por algún motivo se quiere modificar o eliminar solo lo tiene que hacer el ingeniero de sistemas  (actor encargado del mantenimiento) | MUST | Evita cambios accidentales |

| RF-54 | El sistema debe permitir usar estos tipos de cuenta para:Clasificar transaccionesCalcular saldos (ingresos se suman, egresos se restan) | MUST |  |




MODULO DE REPORTES Y ESTRATEGIA


| --- | --- | --- | --- | --- |

| ID | Requisito funcional | Prioridad | Justificación |

| RF-55 | El sistema debe permitir al contador seleccionar un rango entre fechas (desde hasta) para filtrar transacciones. | MUST | Base del reporte |

| RF-56 | El sistema debe mostrar el listado de transacciones con: fecha, concepto, cuenta, tipo (ingreso/egreso), monto y saldo resultante | MUST | Información mínima para cuadrar caja |

| RF-57 | El sistema debe mostrar totales al pie: suma ingresos, suma egresos, diferencia | MUST | Cuadre rapido |

| RF-58 | El sistema debe permitir exportar a PDF u Excel todos los informes que se mencionan. | MUST | Respaldo |

| RF-59 | El sistema debe permitir generar un listado general de cuentas seleccionando el rango entre fechas | MUST | Visión general |

| RF-60 | Debe permitir que el reporte del listado general de cuentas contenga: nombre, tipo (ingreso/egreso), saldo actual. |  |  |

| RF-61 | El sistema debe permitir generar un extracto de cuenta individual. | MUST | Auditoria por cuenta |

| RF-62 | Debe permitir seleccionar un rango entre fechas para generar el extracto |  |  |

| RF-63 | El sistema debe mostrar en el extracto: la cuenta que ha seleccionado, numero, fecha, concepto, entrada o salida según qué tipo de cuenta quiere el usuario | MUST | Evolución de saldo |

| RF-64 | El sistema debe mostrar saldo inicial y final en el extracto | MUST |  |

| RF-65 | EL sistema debe permitir generar un resumen de cuentas. | MUST |  |

| RF-66 | Debe permitir seleccionar un rango entre fechas para generar el resumen | MUST |  |

| RF-67 | El sistema debe permitir mostrar en el resumen: número de cuenta, nombre de la cuenta, total de entrada, total de salida y saldo. | MUST |  |

| RF-68 | El sistema debe permitir generar un resumen de tipo de cuentas |  |  |

| RF-69 | Debe permitir seleccionar los desplegables previamente configurados: ingresos y egresos y el rango de fechas que el usuario crea conveniente |  |  |

| RF-70 | El sistema debe mostrar en el resumen: número de cuenta, nombre de la cuenta, entrada o salido según lo que ha seleccionado el usuario: ingreso o egreso y saldo de la cuenta. |  |  |

| RF-71 | El sistema debe permitir generar gráficos estadísticos de liquidez mensual de acuerdo a los datos crudos que se obtienen del nivel operativo. Vale decir, el sistema debe tomar los datos y representarlo en barras. | SHOULD | Alto valor para el Gerente. Se debe intentar incluir, pero si falta tiempo, el sistema sigue siendo operativo. |

| RF-72 | El sistema debe permitir al usuario cambiar el filtro de fechas y el grafico debe actualizarse automáticamente. |  |  |

| RF-73 | El sistema debe generar líneas de tendencia basada en datos históricos | COULD |  |

| RF-74 | El sistema debe alertar sobre posible déficit al futuro |  |  |


