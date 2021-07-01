import { useState } from "react"


/**
 * Custom Hook para las entradas de texto de formularios
 * @param {*} initialState recibe el estado inicial 
 * @returns estado del formulario, la funcion para cambiar estos estados y una funcion para 
 * resetear estados a su estado original.
 * uso: const [formValues, handleInputChange, reset] = useForm(initialForm);
 * el "name " de los imput es obligatorio para que funcione el useForm
 */
export const useForm = (initialState = {}) => {
    
    const [values, setValues] = useState(initialState)

    const reset = () =>{
        setValues(initialState)
    }
    const handleInputChange = ({target})=>{
        setValues({
            ...values,
            [target.name]:target.value
        })  
    }

    return [values, handleInputChange, reset];
}