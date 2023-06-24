import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext()
// eslint-disable-next-line react/prop-types
const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState([]);

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
    }

    

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta
            }}
        >
         {children}   
        </ProyectosContext.Provider>
    )
}
export {
    ProyectosProvider

}
export default ProyectosContext