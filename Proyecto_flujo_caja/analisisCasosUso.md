ANALISIS DE CASOS DE USO

TRAZABILIDAD DE CASOS DE USO

FACILIDADES VS CASOS DE USO


| --- | --- | --- | --- | --- |

| ID | FACILIDAD (FEATURES) | CASOS DE USO |

| F-01 | Un sistema que sea seguro. Que solo entre personal autorizado al sistema y además que cada uno tenga la posibilidad de crear su cuenta. | CU - 01 Iniciar SesiónCU – 02 verificar credencialesCU - 03 Registrar nuevos usuarios |

| F-02 | El sistema que voy a utilizar me tiene que ayudar en registrar todas las salidas y entradas. Si por x razones fallo en algo me tiene que permitir volver a registrar la transacción y por último me debe permitir revertir una operación ya hecha, pero avisándome el motivo | CU – 04 registrar transacciónCU – 05 modificar transacciónCU – 06 anular transacciónCU – 07 registrar motivo de la anulación |

| F-03 | El sistema tiene que acoplarse a nuestras reglas de negocio. Nosotros ya tenemos cuentas preestablecidas y de igual manera los tipos de cuenta que solo son dos (ingresos y egresos). El sistema deberá permitir configurar las cuenta y tipos de cuentas para poder utilizar al momento de registrar una transacción. | CU – 08 gestionar cuentas financierasCU – 09 gestionar tipo de cuentas financieras |

| F-04 | Al final de mes queremos que el sistema nos reporte las transacciones. El listado de las cuentas y su saldo, reporte de cuentas (de manera individual) y tipo de cuentas y que se pueda exportar en PDF o en Excel para así poder sacar una impresión | CU – 10 consultar estado de cuentaCU – 11 ver extracto de cuenta CU – 12 ver resumen por tipo de cuentaCU – 13 ver balance generalCU – 14 exportar reportes |

| F-05 | Y por último queremos ver en gráficos como se mueven nuestros gastos e ingresos. A veces no nos damos cuenta cuanto gastamos o cuanto entra y queremos ver realmente que es lo que pasa para así tomar decisiones | CU – 15 ver liquidez mensualCU – 16 ver proyecciones |




REGLAS DE NEGOCIO VS CASOS DE USO


| --- | --- | --- | --- | --- |

| ID | Regla de negocio (RN) | Casos de uso donde se aplica / valida |

| RN-01 | Autenticación obligatoria: Ningún usuario puede realizar operaciones operativas, de reporte o de mantenimiento sin haber validado previamente sus credenciales activas. | Aplica a todos, validado a través de Iniciar Sesión. |

| RN-02 | Restricción de usuarios por tienda: Un Cajero solo puede registrar, modificar (solo si el contador detecta un error, éste, podrá autorizar la modificación de la transacción). Mientras que el cajero (previa autorización) o el contador podrá anular transacciones pertenecientes a la tienda que tiene asignada. | Registrar transacción, Modificar transacción, Anular transacción. |

| RN-03 | Bloqueo por periodo cerrado: El sistema no permitirá registrar, modificar ni anular ninguna transacción si la fecha/turno (llenado de datos durante el mes) corresponde a un periodo que ya ha sido conciliado o "cerrado".No se llena al momento (en el día) se llena con el pasar de los días cuando se tiene tiempo. Se registra de acuerdo a un cuaderno que se anota en el día y que este todo ok. | Registrar transacción, Modificar transacción, Anular transacción. |

| RN-04 | Justificación de Anulación: Toda anulación de un registro financiero es de carácter "lógico" (el registro no se borra de la base de datos) y requiere obligatoriamente el ingreso de un motivo válido. | Anular transacción.Registrar motivo de anulación |

| RN-05 | Alerta de falta de dinero y monto positivo: Si el registro de un egreso supera el saldo actual de la caja, el sistema debe emitir una advertencia, pero permitiendo continuar bajo responsabilidad del cajero. Además, el monto que se registra es de valor positivo. | Registrar transacción. |

| RN-06 | Con respecto al mantenimiento: La creación, modificación o eliminación de "Cuentas" y "Tipos de Cuenta" está estrictamente reservada para el Ingeniero de Sistemas. | Gestionar cuentas financierasGestionar tipo de cuentas financieras. |

| RN-07 | Con respecto a los reportes: El sistema no debe asignar la fecha (para el reporte) para que se genere reportes pasados. | Exportar reportes y demás derivados de la vista de reportes |




PRIORIZACION DE CASOS DE USO


| --- | --- | --- | --- | --- |

| ITERACIONES | CATEGORIA DE CASO DE USO | CASOS DE USO A PROGRAMAR | OBJETIVO DE LA ITERACION |

| Iteración 1 (de la 1ra semana hasta la 3ra semana) | Arquitectónicos y críticos. Son las columnas y tuberías del sistema. dicho de otra manera, es el desarrollo de las decisiones técnicas más difíciles y armar el esqueleto del proyecto. | CU - 01 Iniciar SesiónCU – 02 verificar credencialesCU - 03 Registrar nuevos usuarios CU – 08 gestionar cuentas financierasCU – 09 gestionar tipo de cuentas financierasCU – 04 registrar transacción | Estabilizar la arquitectura. El sistema ya permite entrar, crear las cuentas base y registrar la plata. Lo que tenemos aquí es un esqueleto funcional. Un boceto. |

| Iteración 2 (desde la 4ta semana hasta la 6ta semana) | Valor de negocio medio (soporte operativo) | CU – 05 modificar transacciónCU – 06 anular transacciónCU – 07 registrar motivo de la anulación CU – 10 consultar estado de cuenta | Dar robustez a la operación. El sistema ya permite corregir errores humanos y cuadrar la caja a fin de mes. |

| Iteración 3 de la semana 7 a la semana 9 | Bajo riesgo. Solo para el análisis del gerente y para la Generación de reportes | CU – 15 ver liquidez mensualCU – 16 ver proyeccionesCU – 11 ver extracto de cuenta CU – 12 ver resumen por tipo de cuentaCU – 13 ver balance generalCU – 14 exportar reportes | Inteligencia de negocios. |




CONSTRUCCION DE PROTOTIPOS

CHECKLIST DEL MODELO DE CASOS DE USO