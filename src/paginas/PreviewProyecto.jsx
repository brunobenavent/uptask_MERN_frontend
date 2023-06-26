import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */

const PreviewProyecto = ({proyecto}) => {
    const {nombre, _id, cliente} = proyecto
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
            {nombre}
            <span className="text-sm text-gray-500 uppercase"> {''}{cliente}</span>
        </p>
        <Link
            className="text-gray-600 hover:text-gray-800 text-sm -font-bold uppercase"
            to={`${_id}`}
        >Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProyecto
