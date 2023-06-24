import { Link } from "react-router-dom"



const Header = () => {
  return (
    <header className="p-4 y-5 bg-white border-b">
        <div className="md:flex md: justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center">
                UpTask
            </h2>
            <input
                type="search"
                placeholder="Buscar proyectos"
                className="rounded-lg lg:w-96 p-2 border"
            />
            <div className="flex items-center gap-4">
                <Link
                    to='/proyectos'
                    className="font-bold uppercase"
                >Proyectos</Link>
            </div>
            <button
                type="button"
                className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-800 transition-colors"
            >Cerrar Sesión</button>
        </div>
    </header>
  )
}

export default Header
