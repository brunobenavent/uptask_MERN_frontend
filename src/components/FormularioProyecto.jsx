import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()

    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()

    useEffect(() => {   
        if(params.id && proyecto.nombre){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params.id]);
    
    const handleSubmit = async e => { 
        e.preventDefault()


        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            setTimeout(() => {
                mostrarAlerta({})
            }, 3000);
            return

        }
       await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
       setId(null)
       setNombre('')
       setDescripcion('')
       setFechaEntrega('')
       setCliente('')
    }

  return (
    <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        {alerta.msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="nombre">Nombre Proyecto</label>
            <input
                type="text"
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="nombre"
                placeholder="Nombre del Proyecto"
                value={nombre || '' }
                onChange={ e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="descripcion">Descripción</label>
            <textarea
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="descripcion"
                placeholder="Descripción del Proyecto"
                value={descripcion || '' }
                onChange={ e => setDescripcion(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="fecha-entrega">Fecha Entrega</label>
            <input
                type="date"
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="fecha-entrega"
                value={fechaEntrega || '' }
                onChange={ e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="cliente">Nombre Cliente</label>
            <input
                type="text"
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="cliente"
                placeholder="Nombre del Cliente"
                value={cliente || '' }
                onChange={ e => setCliente(e.target.value)}
            />
        </div>
        <input
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer rounded text-white uppercase font-bold p-3"
            value={id  ? 'Actualizar Proyecto' : "Crear Proyecto"}
        />
    </form>
  )
}

export default FormularioProyecto
