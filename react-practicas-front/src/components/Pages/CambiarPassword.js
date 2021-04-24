import React from 'react'

export const CambiarPassword = () => {
    return (
        <div className=" container align-self-center justify-content-center d-flex p-5 " style={{maxHeight:"100%", }} >
        
            <form>
                <div className="form-group" >
                    <label for="exampleInputEmail1">Contraseña antigua</label>
                    <input type="password" className="form-control" id="oldPass"  placeholder="Password"/>              
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
