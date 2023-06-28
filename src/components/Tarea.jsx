import formatearFecha from "../helpers/formatearFecha"

const Tarea = ({tarea}) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="text-gray-600">
        <p className="mb-1 text-xl font-bold uppercase">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm italic">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button
            type="button"
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >Editar</button>
        {estado ? (
            <button
                type="button"
                className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Completa</button>
            ) : (
            <button
                type="button"
                className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Incompleta</button>
            
        )}
        <button
            type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >Eliminar</button>
      </div>
    </div>
  )
}

export default Tarea
