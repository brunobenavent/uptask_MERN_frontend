import { Link } from "react-router-dom"
import  {useState } from 'react';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

  // STATE
  const [datos, setDatos] = useState({});
  const [alerta, setAlerta] = useState({});
  // EFFECT


  // HANDLE
  const handleSubmit = async e => {
     e.preventDefault()
     // Validamos que no haya campos vacíos
     const { nombre, email, password, password2 } = datos
     if(Object.keys(datos).length === 0){
      setAlerta({
        msg: "Todos lo campos son obligatorios",
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
     }
     if(password !== password2){
      setAlerta({
        msg: "Los password no coinciden",
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
        return
     }
     if(password.length < 6){
      setAlerta({
        msg: "El password es muy corto, pon almenos 6 caracteres",
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
        return
     }
     // Hacemos la consulta a la API
     try {
        await clienteAxios.post('usuarios', { nombre, email, password })
        setAlerta({msg: 'Creado Correctamente, revisa tu email'})
        setDatos({})
     } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
     }

  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        {alerta.msg && <Alerta
          alerta={alerta}
        />}
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Nombre</label>
          <input
            type="text"
            placeholder="Tu Nombre"
            id="nombre"
            className="w-full border p-3 mt-3 rounded-md bg-gray-50"
            value={datos.nombre || ''}
            onChange={e => setDatos({
              ...datos, 
              [e.target.id]: e.target.value
            })}
          />
        </div>
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
            value={datos.email || ''}
            onChange={e => setDatos({
              ...datos, 
              [e.target.id]: e.target.value
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
            value={datos.password || ''}
            onChange={e => setDatos({
              ...datos, 
              [e.target.id]: e.target.value
            })}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Repetir Password</label>
          <input
            type="password"
            placeholder="Vuelve a Escribir tu Password"
            id="password2"
            className="w-full border p-3 mt-3 rounded-md bg-gray-50"
            value={datos.password2 || ''}
            onChange={e => setDatos({
              ...datos, 
              [e.target.id]: e.target.value
            })}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold hover:bg-sky-800 transition-colors rounded-md cursor-pointer mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to='/'
        >¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link
          to='/olvide-password'
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >Olvidé mi Password</Link>
      </nav>
    </>
  )
}

export default Registrar
