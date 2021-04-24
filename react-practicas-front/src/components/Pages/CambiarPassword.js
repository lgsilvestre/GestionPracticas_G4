import React from 'react'

export const CambiarPassword = () => {
    return (
        <div className="m-0 vh-100 justify-content-center align-items-center row">
            <form>
                <div className="form-change-password col-xs-6" >
                    <label for="exampleInputEmail1">Contraseña antigua</label>
                    <input type="password" className="form-control" id="oldPass"  placeholder="Password"/>
                    <small id="emailHelp" className="form-text text-muted">Contraseña con la que entraste al sistema </small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Contraseña nueva</label>
                    <input type="password" className="form-control" id="newPass" placeholder="new Password"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Repita contraseña</label>
                    <input type="password" className="form-control" id="repiteNewPass" placeholder="new Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Cambiar</button>
            </form>
        </div>
    )
}
