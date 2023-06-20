import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia Sesión y Administra {''}<span className="text-slate-700">tus Proyectos</span></h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
