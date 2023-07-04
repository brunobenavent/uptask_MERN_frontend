import useAuth from "../hooks/useAuth"
import useProyectos from "./useProyectos"

const useAdmin = () => {
    const {proyecto} = useProyectos() 
    const {auth} = useAuth()
    
    return proyecto.creador === auth.uid

}


export default useAdmin