import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios";


const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordGuardado, setPasswordGuardado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const {token} = useParams()
  
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    
    }
    comprobarToken()
  }, [token]);



  const handleSubmit = async e => {
    e.preventDefault()
    if(password.length < 6){
      setAlerta({
        error: true,
        msg: "Debes introducir un password válido"
      })
      return
    }
    try {
      await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
      setAlerta({
        msg: "El password ha sido modificado correctamente"
      })
      setPassword('')
      setPasswordGuardado(true)
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }


    
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece Tu Password y no Pierdas Acceso a {''}<span className="text-slate-700">tus Proyectos</span></h1>
      { alerta.msg && <Alerta alerta={alerta}/>}
      { tokenValido && (
        <>
          <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >Nuevo Password</label>
            <input
              type="password"
              placeholder="Escribe tu Nuevo Password"
              id="password"
              className="w-full border p-3 mt-3 rounded-md bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:bg-sky-800 transition-colors rounded-md cursor-pointer mb-5"
          />
        </form>
        {passwordGuardado && (

          <nav className="lg:flex lg:justify-between">
             <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to='/'
            >Inicia Sesión</Link>
          </nav>

        )}
        
    </>

      )}

      
    </>
  )
}

export default NuevoPassword
