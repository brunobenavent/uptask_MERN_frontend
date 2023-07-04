import formatearFecha from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea

    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()
    const admin = useAdmin()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="text-gray-600">
        <p className="mb-1 text-xl font-bold uppercase">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm italic">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-2">
        {admin && (
        <button
            onClick={()=>handleModalEditarTarea(tarea)}
            type="button"
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >Editar</button>
        )}
        {estado ? (
            <button
                onClick={()=> completarTarea(_id)}
                type="button"
                className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Completa</button>
            ) : (
            <button
                onClick={ ()=> completarTarea(_id)}
                type="button"
                className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Incompleta</button>
            
        )}
        {admin && (
        <button
            onClick={()=>handleModalEliminarTarea(tarea)}
            type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >Eliminar</button>
        )}
      </div>
    </div>
  )
}

export default Tarea
