import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const ProyectosContext = createContext()
// eslint-disable-next-line react/prop-types
const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

    const navigate = useNavigate()
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerProyectos = async()=>{
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                if(!token) return
                const {data} = await clienteAxios('/proyectos', config)
                setProyectos(data)
                
            } catch (error) {
                console.log(error)
                mostrarAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        obtenerProyectos()
    }, [auth]);
 
    const mostrarAlerta = alerta => setAlerta(alerta)

    const submitProyecto = async proyecto => {
        
        if(proyecto.id){
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto)
        }   
    }
    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
                
            }
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            console.log(proyectosActualizados)
            setProyectos(proyectosActualizados)
            mostrarAlerta({msg: "Proyecto Actualizado Correctamente"})
            setTimeout(() => {
                mostrarAlerta({})
                navigate('/proyectos')
            }, 3000);


        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(!token) return
            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data])
            mostrarAlerta({msg: "Proyecto Creado Correctamente"})
            setTimeout(() => {
                mostrarAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            // mostrarAlerta({msg: error.response.data.msg, error:true})
            console.log(error)
        } 
    }

    const obtenerProyecto = async id => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
            setCargando(true)
         try {
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            
         } catch (error) {
            console.log(error)
         }
         setCargando(false)
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)


            const proyectosActualizados = proyectos.filter( proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            mostrarAlerta({msg:data.msg})
            setTimeout(() => {
                mostrarAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea) 
    }
    const submitTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/tareas', tarea, config)
            

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActualizado)
            mostrarAlerta({})
            setModalFormularioTarea(false)
            
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea
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