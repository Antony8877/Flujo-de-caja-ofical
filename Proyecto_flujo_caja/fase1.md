Propuesta técnica y plan de trabajo – Sistema AgrovetManantial

INTRODUCCION Y ANTECEDENTES

Descripción de la empresa

AgrovetManantial es una empresa dedicada a la venta de productos agropecuarios que operan en cuatro tiendas en la región de Ayacucho y dos tiendas en la región Lima. Esta empresa nace…

Situación actual

Actualmente trabajan de manera organizada en lo que respecta al flujo de caja, pero con aplicaciones ya desfasadas a nuestra época. Utilizan la aplicación office de Microsoft llamada Access. Es una aplicación programada para un flujo de caja, pero no cuentan con la tecnología necesaria de hoy en día. Vale decir, solo es posible instalarlo en las PCs disponibles en cada tienda, no tienen la posibilidad de interconectar las diferentes tiendas. Otro problema es que esta aplicación está programada en 32 bits y ya no corre con aplicaciones con 64bit lo que significa un gran riesgo si se decide trabajar con Windows 11 o posteriores actualizaciones. El actual sistema no incluye los diferentes niveles empresariales (operacional, táctico y estratégico), los gerentes no cuentan con DashBoard que brinden datos visuales y menos con la interconexión de estos niveles empresariales. 

DIAGNOSTICO DEL PROBLEMA

Realidad problemática

La empresa AgrovetManantial gestiona sus operaciones de tesorería mediante una aplicación de escritorio desarrollada en Microsoft Access (VBA) con arquitectura de 32 bits. Actualmente, este sistema enfrenta una obsolescencia tecnológica crítica: la infraestructura de hardware y software moderno (Windows 10/11 y Office de 64 bits) ha dejado de ser compatible con la arquitectura base de la aplicación actual.

A nivel operativo, el sistema funciona de manera descentralizada (archivos locales en cada PC), lo que genera islas de información. Esto obliga a realizar procesos manuales de consolidación de datos entre sucursales, impidiendo la obtención de estados financieros en tiempo real y aumentando el riesgo de inconsistencia, corrupción de archivos locales (.accdb) y pérdida de trazabilidad.

Análisis de causas

Falta de actualización en los computadores que manejan. Falta de una migración a tecnologías de última generación. La no inversión en sistemas modernos seguros amigables con los usuarios. Falta de información sobre los avances tecnológicos y estrategias empresariales

Matriz FODA

FORTALEZAS

Lógica de negocio clara: ya tienen definidos sus “conceptos” (agua, luz planilla) y “tipos de cuenta” (ingreso, egreso). No se parte de cero.

Cultura de registro: el personal ya sabe que debe registrar cada movimiento. No hay resistencia al cambio en el proceso, solo en la herramienta.

Reportes valorados: les gustan sus reportes de transacciones entre fechas, resumen de cuentas. El sistema debe tener reportes iguales o mejores. 

DEBILIDADES (a eliminar)

Dependencia de 32 bits: el software es incompatible con hardware moderno. 

Descentralización: la información vive en archivos locales en cada PC, no hay un base de datos única.

Mantenimiento manual: tienen que crear copias manuales para que el sistema no colapse.

OPORTUNIDADES (a explotar)

Migración web (la nube): centralizar las tiendas en una sola base de datos accesible desde cualquier lugar.

Accesibilidad móvil: permitir al gerente general ver el saldo desde el celular

AMENAZAS (riesgos externos)

Perdida de soporte OS: que una actualización de Windows deje inoperable el sistema actual mañana mismo

Integridad de archivos: los archivos Access son propensos a corromperse si se apaga mal la PC.

PLANTEAMIENTO DE LOS OBJETIVOS

Objetivo general

Desarrollar e implementar un sistema integral de información financiera web para AgrovetManantial que articule los niveles operativo, táctico y estratégico de la organización, migrando la actual gestión limitada a una plataforma centralizada que soporte la toma de decisiones de alto nivel.

Objetivos específicos (SMART)

Para el nivel operativo

Estandarizar y asegurar la captura de datos diarios. Reemplazar la aplicación de escritorio de 32 bits por una interfaz web Responsiva que permita el registro de ingresos y egresos en todas las sucursales, reduciendo errores de duplicidad y asegurando la compatibilidad con hardware moderno (Windows 11/64 bits) en un plazo de 2 meses.

Para el nivel táctico

Centralizar a información para el control de gestión. Implementar una base de datos unificada en la nube que consolide en tiempo real la información de las Tiendas T1, T2 y T3, eliminando el proceso manual de fusión de archivos y permitiendo al Contador generar reportes de conciliación y control de deuda (Acreedores) al instante.

Para el nivel estratégico

Proveer inteligencia financiera para la alta dirección. Desarrollar un módulo de inteligencia de negocios (Dashboard) que genere automáticamente el flujo de caja mensual, un estado de resultados (operativo, inversión, financiamiento) y proyecte la liquidez a 30/60 días, permitiendo a la Gerencia visualizar tendencias y anticipar déficits de efectivo mediante gráficos comparativos anuales.

PLANTEAMIENTO DEL ALCANCE Y LAS HERRAMIENTAS 

Descripción de la solución

Se propone el desarrollo de una plataforma web de gestión financiera (SaaS) basada en la arquitectura cliente-servidor, que reemplace la aplicación de escritorio actual. La solución residirá en un servidor en la nube (Cloud), permitiendo de acceso ubicuo desde cualquier navegador moderno, eliminando la dependencia de librerías de 32 bits. 

Módulos del sistema

Nivel operativo:

Modulo de autenticidad y seguridad: login, roles (administrador, responsable de la tienda 1, 2, 3..., hasta el 6) y la bitácora de auditoria (Saber quién hizo qué).

Modulo de tesorería diaria: registro CRUD (Crear, leer, actualizar, borrar) de ingresos y egresos con validación de tipo de datos.

Mantenimiento de entidades y conceptos de gastos.

Nivel táctico:

Generación de reportes PDF/Excel: arqueo de caja, movimiento por rango de fechas, deuda y proveedores.

Conciliación de saldos por sucursal (tienda 1,2,3,..6)

Nivel estratégico:

Motor financiero: algoritmo automático para calcular el estado de flujo de efectivo (operativo, inversión, financiamiento).

DashBoard gerencial: visualización grafica de liquidez y proyecciones. 

Delimitaciones

El sistema no realizará la emisión legal de Facturación Electrónica (conexión directa con SUNAT/Hacienda), solo el registro administrativo del cobro/pago.

El sistema no gestionará Inventarios (Kardex de productos unitarios), solo los montos financieros de las compras y ventas.

La migración de datos históricos se limitará al ejercicio fiscal actual y el saldo inicial del año anterior.

ESTUDIO DE VIABILIDAD

Viabilidad técnica (listado de herramientas):

Herramientas de desarrollo

Python (backend) (Django o FastAPI) O Node.js: Python es excelente para cálculos financieros y manejo de datos. Node.js es muy rápido para sistemas en tiempo real.

React.js o Vue.js (Frontend): permite crear interfaces rápidas y responsivas (SPA) que se siente como una aplicación de escritorio, ideal para que el cajero no extrae la velocidad del Access.

Base de datos: PostgreSQL es una base de datos relacional robusta, gratuita y superior a MySQL para la integridad de datos financieros y transacciones complejas.

Modelado: Enterprise Architect perfecto para diagramas de casos de uso, clases y secuencias

Herramientas de gestión

Microsoft Project: para el cronograma y rutas críticas.

Trello/ Jira: para el control de tareas diarias (Kanban)

GitHub/GitLab: para el control de versiones de código (repositorio)

Viabilidad económica:

El análisis costo-beneficio del proyecto es positivo. La inversión en el desarrollo del software representa un costo único inferior a los gastos recurrentes y riesgos asociados al sistema actual, tales como: la pérdida de horas-hombre en consolidación manual de datos, el riesgo de multas por desorden financiero y la imposibilidad de expansión. Al ser una solución In-House (a medida), la empresa evita el pago de licencias costosas de ERPs internacionales, asegurando un retorno de inversión (ROI) estimado en 6 meses mediante la optimización de procesos.

Viabilidad operativa:

El proyecto cuenta con una alta viabilidad operativa dado que la organización ya posee una cultura de registro; el personal está habituado a ingresar datos diariamente. La resistencia al cambio se mitigará manteniendo la lógica de 'Conceptos' y 'Cuentas' familiar para ellos, mejorando únicamente la interfaz y la velocidad. Además, el equipo directivo ha manifestado su compromiso total para la transición hacia tecnologías web.

PLANIFICACION

Cronograma tentativo: hecho en Microsoft Project

El proyecto tendrá una duración estimada de 12 semanas (3 meses), divididas en las siguientes fases macro:

Mes 1: análisis detallado, diseño de base de datos y prototipado.

Mes 2: desarrollo del núcleo y interfaz operativa

Mes 3: desarrollo de deportes/Dashboard, pruebas de calidad, migración de datos y despliegue final

Entregables: los entregables al finalizar cada fase.

ACTA DE CONSTITUCION DEL PROYECTO


| --- | --- | --- | --- | --- |

| Título del Proyecto | Desarrollo e Implementación del “Sistema Integral de Información Financiera para AgrovetManantial” (SaaS). |

| Código del Proyecto | PRJ-AGRO-001 |

| Fecha de Elaboración | Febrero 2026 |

| Patrocinador (Cliente) | AgrovetManantial SAC |

| Jefe de Proyecto | Ing. Calderon Galindo, Antony Brayan |





| --- | --- | --- | --- | --- |

| 2. PROPÓSITO Y JUSTIFICACIÓN |

| El propósito del proyecto es modernizar la gestión de tesorería de la empresa, reemplazando el actual sistema de escritorio (Access/32 bits) que se encuentra en obsolescencia tecnológica. El nuevo sistema integrará los niveles operativo, táctico y estratégico, centralizando la información de todas las tiendas en la nube para mitigar riesgos de pérdida de datos y soportar la toma de decisiones gerenciales en tiempo real. |




3. Descripción del equipo


| --- | --- | --- | --- | --- |

| Miembro del Equipo | Rol / Cargo | Responsabilidad Principal |

| Ing. Calderon Galindo, Antony | Project Manager & Full Stack Dev. | Dirección, Arquitectura, Desarrollo y Despliegue. |

| Gerencia General | Stakeholder Principal | Validación de requerimientos y aprobación de entregables. |

| Contador / Admin | Usuario Experto (Key User) | Apoyo en definiciones contables y pruebas funcionales. |




4. Cronograma de hitos principales


| --- | --- | --- | --- | --- |

| Hito | Fecha estimada | Entregable asociado |

| Inicio del proyecto | 09 de febrero 2026 | Acta de constitución firmada. |

| Fin de fase análisis | 20 de febrero 2026 | Documento de especificación de requisitos (SRS). |

| Entrega de prototipos | 05 de marzo 2026 | Mockups y diseño de base de datos. |

| Puesta en producción | 09 de abril 2026 | Sistema desplegado, manuales y capacitación. |




5. Presupuesto referencial

El costo total del proyecto y la forma de pago se rigen según lo estipulado en la propuesta técnica y económica adjunta a este documento, aprobada previamente por la Gerencia.

6. Autorización formal:

Por medio del presente documento, se formaliza el inicio del proyecto denominado "Sistema Integral de Información Financiera para AgrovetManantial". Se designa al Ing. Calderon Galindo, Antony como jefe del Proyecto, otorgándole la autoridad para planificar, ejecutar y controlar los recursos necesarios para cumplir con los objetivos descritos en esta propuesta.

-----------------------------------------------

DNI: 72152067

Ing. Calderon Galindo, Antony