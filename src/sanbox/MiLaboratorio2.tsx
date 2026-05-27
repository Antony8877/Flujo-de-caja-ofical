//La Siguiente Pieza: El Estado Mutuable y la Inmutabilidad
//Hasta ahora, tus datos de prueba eran estáticos (const). No cambiaban. Pero en tu pantalla real de Agrovet, 
//el usuario va a hacer clic en Anular Transacción y ese registro debe cambiar de estado instantáneamente en la pantalla sin recargar la página.
// Para lograr esto de forma ultra-eficiente, necesitamos que la lista de transacciones viva en el Estado de React.

// Lo que queremos decir es que al momento de editar de nuevo una transaccion o la anulemos el estado o los datos en cuestion deben adquirir
// una nueva forma
import React, { useState } from 'react'; // 1. Importamos la herramienta de Estado

// El useState lo colocamos en el Componente Padre (PantallaLaboratorio). Es la "batería recargable" de la pantalla.

// --- CONTRATOS ---
type TipoTransaccion = 'ingreso' | 'egreso';

interface TransaccionAgrovet {
  id: string;
  producto: string;
  monto: number;
  tipo: TipoTransaccion;
  anulada: boolean; // 2. Nueva propiedad obligatoria en nuestro contrato
}

interface ListaTransaccionesProps {
  historial: TransaccionAgrovet[];
  onAnular: (id: string) => void; // 3. Pasamos una FUNCIÓN como propiedad (Callback).. para anular una transaccion necesitamos identificar que array queremos eliminar
  // y la identificamos con un id.. para utilizar esta logica la envolvemos en uuna funcion onAnular.
  // (id: string): Significa: "Quienquiera que ejecute esta función, está obligado a pasarle un texto (el ID de la transacción) entre los paréntesis".
  // => void: La palabra void en programación significa "vacío". Le dice al sistema: "Esta función va, hace una acción (anular), pero no devuelve 
  // ningún valor de retorno (como un número o un texto) al terminar".
}

// --- COMPONENTE HIJO (Filas de la Tabla) ---
export const HistorialFinanciero: React.FC<ListaTransaccionesProps> = ({ historial, onAnular }) => { //¡Exacto! Esos corchetes { } se llaman Destructuring (Desestructuración
    // Al poner ({ historial, onAnular }), EXTRAEMOS LIMPIAMENTE LAS PROPIEDADES DE ListaTransaccionesProps directamente del objeto en la misma puerta de entrada. 
    // Es directo, rápido y súper eficiente para la memoria.
  return (
    <div className="space-y-2">
      {historial.map((item) => ( // Esto es como una iteracion, es un bucle un loop. E item sera lo que en python conocemos "i": for i in .. Es i quien toma valors de una
// lista por ejemplo. De la misma manera se entiendo item. item representa al objeto completo de la transacción actual en ese instante del bucle, no solo a una propiedad.
        <div 
          key={item.id} // Esto es solo una etiqueta invisible para que React IDENTIFICAR DE FORMA UNICA A ESTA FILA en el procesador. La fila puede ser: 1,2,3,4
          className={`flex justify-between items-center p-3 rounded-xl border transition-all duration-350 ${
            item.anulada 
              ? 'bg-slate-950/40 border-slate-900 opacity-40 lines-through' // Estilo eficiente si está anulada. Osea vamos con el bucle. Bucle 1: producto 1. 
              // si en el array que ponemostenemos que la proiedad anulada es igual a false se ejecutara este codigo un tachado.
              : 'bg-slate-850 border-slate-800'
          }`}
        >
          <div>
            {/* Si está anulada, le añade un tachado visual al texto */}
            <p className={`font-medium ${item.anulada ? 'line-through text-slate-500' : 'text-white'}`}>
              {item.producto}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold 
            ${
              item.anulada
                ? 'bg-slate-800 text-slate-500'
                : item.tipo === 'ingreso' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`
            }>
              {item.anulada ? 'ANULADA' : item.tipo}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <p className={`font-bold ${item.anulada ? 'text-slate-500 line-through' : item.tipo === 'ingreso' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.tipo === 'ingreso' ? '+' : '-'}${item.monto.toFixed(2)}
            </p>
            
            {/* Botón de anular: Eficiencia pura de control */}
            <button
              onClick={() => onAnular(item.id)}
              disabled={item.anulada} // Si ya está anulada, el botón se bloquea nativamente
              className="px-2 py-1 text-xs font-semibold bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              Anular
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENTE PADRE CONTENEDOR (El Cerebro) ---
export const PantallaLaboratorio1: React.FC = () => {
  
  // 4. ESTADO FUERTEMENTE TIPADO: Indicamos que este estado controlará un arreglo de TransaccionAgrovet
  const [transacciones, setTransacciones] = useState<TransaccionAgrovet[]>([
    { id: '1', producto: 'Saco de Fertilizante Urea', monto: 120.50, tipo: 'ingreso', anulada: false },
    { id: '2', producto: 'Vitaminas para Ganado Bovino', monto: 45.00, tipo: 'ingreso', anulada: false },
    { id: '3', producto: 'Pago de Luz Local Comercial', monto: 85.20, tipo: 'egreso', anulada: false },
  ]);

  // transacciones es solo una variable de lectura que contiene la lista pero sabemos que tambien queremos cambios de estado y para eso tenemos
  // setTransacciones y es una funcion activadora. Es la única palanca en el universo capaz de cambiar el valor de transacciones y avisarle a la pantalla que se actualice.
  // 5. FUNCIÓN DE ANULACIÓN ULTRA-EFICIENTE (Inmutabilidad Absoluta)


  //  CODIGO QUE NO ENTIENDO Y LO EXPLICO:

  /*
  
    
  */
  const handleAnular = (idAnular: string) => {
    setTransacciones((listaAnterior) => 
      listaAnterior.map((t) => 
        t.id === idAnular ? { ...t, anulada: true } : t
      )
    );
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
        <h1 className="text-xl font-bold text-slate-100 mb-1">Agrovet Manantial</h1>
        <p className="text-sm text-slate-400 mb-6">Módulo de Pruebas Reactivas (Interactivo)</p>
        
        {/* Pasamos el estado y la función modificadora al hijo */}
        <HistorialFinanciero historial={transacciones} onAnular={handleAnular} />
        
      </div>
    </div>
  );
};