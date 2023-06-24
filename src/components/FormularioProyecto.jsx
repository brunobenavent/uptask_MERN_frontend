import { useState } from "react"
import Alerta from "./Alerta";
import clienteAxios from "../config/axios";
import useProyectos from "../hooks/useProyectos";

const FormularioProyecto = () => {

    const [datos, setDatos] = useState({})


    const {mostrarAlerta, alerta} = useProyectos()

    const handleSubmit = async e => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        if(Object.values(datos).length ===0){
            mostrarAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post('proyectos', config)
            console.log(data)
        } catch (error) {
            mostrarAlerta({msg: error.response.data.msg, error:true})
        }
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
                value={datos.nombre || '' }
                onChange={ e => setDatos({
                    ...datos,
                    [e.target.id]: e.target.value
                })}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="descripcion">Descripción</label>
            <textarea
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="descripcion"
                placeholder="Descripción del Proyecto"
                value={datos.descripcion || '' }
                onChange={ e => setDatos({
                    ...datos,
                    [e.target.id]: e.target.value
                })}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="fecha-entrega">Fecha Entrega</label>
            <input
                type="date"
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="fecha-entrega"
                value={datos.fecha || '' }
                onChange={ e => setDatos({
                    ...datos,
                    [e.target.id]: e.target.value
                })}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 font-bold text-sm uppercase" htmlFor="cliente">Nombre Cliente</label>
            <input
                type="text"
                className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                id="cliente"
                placeholder="Nombre del Cliente"
                value={datos.cliente || '' }
                onChange={ e => setDatos({
                    ...datos,
                    [e.target.id]: e.target.value
                })}
            />
        </div>
        <input
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-800 transition-colors cursor-pointer rounded text-white uppercase font-bold p-3"
            value="Crear Proyecto"
        />
    </form>
  )
}

export default FormularioProyecto
