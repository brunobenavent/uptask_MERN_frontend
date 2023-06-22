import { Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import { useState } from "react";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');  
  const [alerta, setAlerta] = useState({});  
  const handleSubmit = async e => {
    e.preventDefault()
    if(email ==='' ){
      setAlerta({msg: 'El email es obligatorio', error: true})
      return
    }
    try {
      await clienteAxios.post('/usuarios/olvide-password', {email})
      setAlerta({msg: 'Le hemos enviado un email con las instrucciones para resetear su password'})
      setEmail('')
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu Acceso y no Pierdas {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        {alerta.msg && <Alerta alerta={alerta}/>}
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>
          <input
            type="email"
            placeholder="Email de Registro"
            id="email"
            className="w-full border p-3 mt-3 rounded-md bg-gray-50"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
        </div>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:bg-sky-800 transition-colors rounded-md cursor-pointer mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to='/'
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to='/registrar'
        >¿No tienes una cuenta? Regístrate</Link>
        <Link/>
      </nav>
    </>
  )
}

export default OlvidePassword
