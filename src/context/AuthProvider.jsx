import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios"

const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async() => { 
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config= {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {   
                const {data} = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
         {children}   
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext