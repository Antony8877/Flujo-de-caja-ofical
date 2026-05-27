// JavaScript Tradicional (Peligroso e ineficiente)
let monto = 150; 
// monto = "ciento cincuenta"; // El navegador lo permite, pero romperá tus cálculos matemáticos en producción.
// TypeScript soluciona esto introduciendo el TIPADO ESTRICTO. Abre tu archivo src/sandbox/MiLaboratorio.tsx y escribe tu primer código analizando cada palabra:
// 1. Declaración explícita de tipo
let montoTransaccion: number = 250;

// 2. Intento de sabotaje (Si desasocies este código, tu editor se pintará de rojo)
// montoTransaccion = "Doscientos"; // ❌ ERROR: TypeScript te frena antes de enviar el código al navegador.

// Las Interfaces: El Contrato de Eficiencia de tu Proyecto
// En tu sistema manejas "Transacciones". En lugar de inventar cómo es una transacción en cada pantalla, creamos un Contrato Único llamado interface. 
// Escribe esto abajo en tu laboratorio:
interface TransaccionSimple { // Palabra reservada para definir la estructura u "hoja de datos" de un objeto.
  id: string; // Obliga a que cada transacción tenga un identificador único de texto (ej. "TRX-001"). React usa esto para renderizar
  //  listas de manera ultra-eficiente en la pantalla sin recalcular toda la página.
  monto: number;
  esIngreso: boolean;
}

//Paso 3: ¿Qué es TSX? (TypeScript + HTML)
//  Tú estás acostumbrado a ver archivos .html o .js. En React usamos .tsx.
//  La X significa Extensión de Sintaxis (JSX). Básicamente es una tecnología que te permite escribir etiquetas de apariencia HTML 
//  directamente dentro de tu lógica de JavaScript/TypeScript de una forma extremadamente veloz.
// import React from 'react';

// // 1. Definimos qué "Props" (datos de entrada) necesita este componente para existir
// interface TarjetaInformativaProps {
//   titulo: string;
//   total: number;
// }

// // 2. Creamos el componente usando TypeScript
// export const TarjetaInformativa: React.FC<TarjetaInformativaProps> = ({ titulo, total }) => {
//   return (
//     <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
//       <h3 className="text-sm text-slate-400 font-medium">{titulo}</h3>
//       <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
//     </div>
//   );
// };

// import React from 'react';

// // 1. EL CONTRATO (No gasta memoria en el navegador)
// interface TarjetaInformativaProps {
//   titulo: string;
//   total: number;
// }

// // 2. EL COMPONENTE REUTILIZABLE
// export const TarjetaInformativa: React.FC<TarjetaInformativaProps> = ({ titulo, total }) => {
//   return (
//     <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
//       <h3 className="text-sm text-slate-400 font-medium">{titulo}</h3>
//       <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
//     </div>
//   );
// };

// // 3. EL EXPERIMENTO: Aquí simulamos cómo otra pantalla usaría tu tarjeta
// export const PantallaLaboratorio: React.FC = () => {
//   return (
//     <div className="p-6 bg-slate-900 min-h-screen text-white space-y-4">
//       <h1 className="text-xl font-bold">Laboratorio de Aprendizaje Agrovet</h1>
      
//       {/* USO CORRECTO: Cumple perfectamente el contrato */}
//       <TarjetaInformativa titulo="Ingresos Totales del Día" total={450.75} />

//       {<TarjetaInformativa titulo="Compras" total="cuatrocientos" /> }
      
//     </div>
//   );
// };


//Ahora que ya dominas las variables simples y las interfaces, necesitas aprender los dos siguientes superpoderes de TypeScript 
// que tu proyecto (Agrovet) exige a gritos: Las Uniones de Tipos y El Tipado de Arreglos (Listas).

// Superpoder 1: Las Uniones de Tipos (Union Types) con el operador |
// En tu sistema de Agrovet, una transacción solo puede ser de dos tipos: o es un ingreso (ganancia) o es un egreso (gasto).
// tal que asi:


let tipoMovimiento: string = "ingreso"; // suceptible a fallaso de digitacion para ello utilizamos union de tipos

// 1. Creamos un tipo personalizado estricto. Solo se permiten estas dos palabras exactas.
// type TipoTransaccion = 'ingreso' | 'egreso';

// 2. Aplicamos el tipo a una variable
let movimientoActual: TipoTransaccion = "ingreso";


// movimientoActual = 'prestamo'; // ❌ ERROR MÁXIMO: TypeScript te frena en seco. 'prestamo' no existe en el contrato.

// Superpoder 2: El Tipado de Arreglos (Listas) []

// En tu pantalla de transacciones o en tu pantalla anual no vas a mostrar una sola transacción; vas a mostrar una lista (un historial completo) de transacciones.
// n TypeScript, para decirle a la memoria que una variable no guarda un solo objeto, sino una colección (un arreglo) de ellos, usamos los corchetes [] pegados 
// al tipo de dato.

// codigo final fusionado

// import React from 'react';

// // --- NUESTROS CONTRATOS (Cero código basura) ---

// type TipoTransaccion = 'ingreso' | 'egreso';

// interface TransaccionAgrovet {
//   id: string;
//   producto: string;
//   monto: number;
//   tipo: TipoTransaccion; // 💡 Aquí reutilizamos la Unión de Tipos de arriba
// }

// // --- EL COMPONENTE INTELIGENTE ---

// interface ListaTransaccionesProps {
//   // 💡 Indicamos que 'historial' es un ARREGLO de objetos que cumplen el contrato 'TransaccionAgrovet'
//   historial: TransaccionAgrovet[]; 
// }

// //Le dice a React: "La prop 'historial' es una lista obligatoria de transacciones. No me puedes pasar un texto, ni un número suelto, ni un objeto incompleto"
// export const HistorialFinanciero: React.FC<ListaTransaccionesProps> = ({ historial }) => {
//   return (
//     <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
//       <h2 className="text-lg font-bold text-slate-200 mb-3">Historial Agrovet</h2>
      
//       <div className="space-y-2">
//         {/* Usamos .map() para recorrer la lista de manera eficiente */}
//         {historial.map((item) => (
//           <div 
//             key={item.id} // 💡 Clave única para que React renderice a la velocidad del rayo
//             className="flex justify-between items-center p-3 bg-slate-850 rounded-xl border border-slate-800"
//           >
//             <div>
//               <p className="font-medium text-white">{item.producto}</p>
//               {/* Renderizado condicional ultra-limpio basado en nuestro tipo estricto */}
//               <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
//                 item.tipo === 'ingreso' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
//               }`}>
//                 {item.tipo}
//               </span>
//             </div>
//             <p className={`font-bold ${item.tipo === 'ingreso' ? 'text-emerald-400' : 'text-rose-400'}`}>
//               {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react';

// 1. CONTRATOS
type TipoTransaccion = 'ingreso' | 'egreso';

interface TransaccionAgrovet {
  id: string;
  producto: string;
  monto: number;
  tipo: TipoTransaccion;
}

interface ListaTransaccionesProps {
  historial: TransaccionAgrovet[];
}

// 2. COMPONENTE HIJO (El que dibuja las filas)
export const HistorialFinanciero: React.FC<ListaTransaccionesProps> = ({ historial }) => {
  return (
    <div className="space-y-2">
      {historial.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-3 bg-slate-800 rounded-xl border border-slate-700">
          <div>
            <p className="font-medium text-white">{item.producto}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              item.tipo === 'ingreso' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {item.tipo}
            </span>
          </div>
          <p className={`font-bold ${item.tipo === 'ingreso' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

// 3. DATOS DE PRUEBA (Respetando el contrato obligatoriamente)
const misTransaccionesDePrueba: TransaccionAgrovet[] = [
  { id: '1', producto: 'Saco de Fertilizante Urea', monto: 120.50, tipo: 'ingreso' },
  { id: '2', producto: 'Vitaminas para Ganado Bovino', monto: 45.00, tipo: 'ingreso' },
  { id: '3', producto: 'Pago de Luz Local Comercial', monto: 85.20, tipo: 'egreso' },
];

// 4. COMPONENTE PADRE CONTENEDOR (La pantalla del laboratorio)
export const PantallaLaboratorio: React.FC = () => {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-850 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h1 className="text-xl font-bold text-slate-100 mb-1">Agrovet Manantial</h1>
        <p className="text-sm text-slate-400 mb-6">Laboratorio de Pruebas TSX</p>
        
        {/* 💡 AQUÍ PASAMOS LOS DATOS AL HIJO */}
        <HistorialFinanciero historial={misTransaccionesDePrueba} />
        
      </div>
    </div>
  );
};

