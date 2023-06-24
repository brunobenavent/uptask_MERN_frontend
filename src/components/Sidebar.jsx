import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Sidebar = () => {


    const {auth} = useAuth()
    const {nombre} = auth
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-4xl font-bold px-3">Hola <span className="font-normal block text-sm uppercase">{nombre}</span></p>
        <Link
            to="crear-proyecto"
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar
