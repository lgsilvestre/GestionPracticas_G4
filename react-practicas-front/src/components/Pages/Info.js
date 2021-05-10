import React from 'react'
import { Link } from 'react-router-dom'
export const Info = () => {
    return (
        <div>
            <h1>Proyecto Gestion de Pacticas</h1>               
                    <h3>para trabajar en vista estudiante: /estudiante </h3>   
                    <Link to="/estudiante">
                        <button className ="btn btn-secondary">
                            Estudiante
                        </button>
                    </Link>
                    <h3>para trabajar en vista admin : /admin</h3>   
                    <Link to="/admin">
                        <button className ="btn btn-secondary">
                            Admin
                        </button>
                    </Link>
                    <h3>para trabajar en vista Login : /login</h3>   
                    <Link to="/login">
                        <button className ="btn btn-secondary">
                            Login
                        </button>
                    </Link>
                    <h3>para trabajar en tabla practicas : /practicas</h3>   
                    <Link to="/table">
                        <button className ="btn btn-secondary">
                            Table
                        </button>
                    </Link>
        </div>
    )
}
