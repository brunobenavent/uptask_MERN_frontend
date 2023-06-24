import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"

const Login = () => {
  // STATE
  const [login, setLogin] = useState({});
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth()

  const handleSumbit = async e => {
    e.preventDefault()

    if(Object.values(login).includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    try {
      const {data} = await clienteAxios.post('/usuarios/login', login)
      setAlerta({})
      localStorage.setItem('token',data.token)
      setAuth(data)
      

    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }

  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y Administra {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <form
        onSubmit={handleSumbit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        { alerta.msg && <Alerta alerta={alerta}/>}
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
            value={login.email || ''}
            onChange={e => setLogin({
              ...login,
              [e.target.id]:e.target.value
            })}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Password</label>
          <input
            type="password"
            placeholder="Escribe tu Password"
            id="password"
            className="w-full border p-3 mt-3 rounded-md bg-gray-50"
            value={login.password || ''}
            onChange={e => setLogin({
              ...login,
              [e.target.id]:e.target.value
            })}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:bg-sky-800 transition-colors rounded-md cursor-pointer mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to='/registrar'
        >¿No tienes una cuenta? Regístrate</Link>
        <Link
          to='/olvide-password'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Olvidé mi Password</Link>
      </nav>
    </>
  )
}

export default Login
