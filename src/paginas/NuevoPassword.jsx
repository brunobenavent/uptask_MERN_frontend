import { Link } from "react-router-dom"

const NuevoPassword = () => {
    
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece Tu Password y no Pierdas Acceso a {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>
        <input
          type="submit"
          value="Guardar Nuevo Password"
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

export default NuevoPassword
