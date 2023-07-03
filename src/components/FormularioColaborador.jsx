import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {

    const [email, setEmail] = useState('');
    
    const {mostrarAlerta, alerta, submitColaborador} = useProyectos()

    const handleSubmit = async e => {
        e.preventDefault()

        if(email===''){
            mostrarAlerta({msg: "El email es obligatorio", error: true})
            return
        }

        await submitColaborador(email)

    }

    return (
        
        <form
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {alerta.msg && <Alerta alerta = {alerta} />}
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className='text-gray-700 uppercase font-bold text-sm'
                >Email Colaborador
                </label>
                <input
                    id='email'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Nombre de la tarea'
                    type="email"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />

            </div>
            <input
                type="submit"
                className='bg-sky-600 hover:bg-sky-700 w-full p-3 uppercase text-white font-bold cursor-pointer transition-colors text-sm rounded'
                value= "Buscar Colaborador"
            />
        </form>
    )
}

export default FormularioColaborador
