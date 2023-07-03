import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos()
    const {id} = useParams()
    useEffect(() => {
        obtenerProyecto(id)
    }, []);
// if(cargando) return 'cargando…'
if(!proyecto?._id) return <Alerta alerta={alerta} />
  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador al proyecto {proyecto.nombre}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador/>

      </div>
      {cargando ? <p className="text-center">cargando...</p> : colaborador?.uid && (
        <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="taxt-center mb-10 text-2xl font-bold">Resultado:</h2>
              <div className="flex justify-between items-center">
                <p>{colaborador.nombre}</p>
                <button
                  onClick={() => agregarColaborador(colaborador.email)}
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  type="button"
                >Agregar al Proyecto</button>
              </div>
            </div>
        </div>

      )}
    </>
  )
}

export default NuevoColaborador
