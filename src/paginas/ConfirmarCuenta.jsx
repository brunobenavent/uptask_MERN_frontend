import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {

  const { id } = useParams()
  const [alerta, setAlerta] = useState();
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        await clienteAxios(`/usuarios/confirmar/${id}`)
        setAlerta({msg: "Cuenta confirmada correctamente"})
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, []);


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma Tu Cuenta y Empieza a Crear {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <div className="mt-10 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white">
        {alerta?.msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (<Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to='/'
          >Inicia Sesión</Link>
        )}
      
      </div>
    </>
  )
}

export default ConfirmarCuenta
