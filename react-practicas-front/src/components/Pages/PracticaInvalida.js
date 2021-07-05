import React from 'react'
import logo from "./../../assets/do-not-pass-hi.png"
export const PracticaInvalida = () => {
  return (
    <div className="container animate__animated animate__fadeIn animate__faster" 
      style={{height:"58.6vh"}}>
      <div className="row align-self-center justify-content-md-center">
        <div className="col" style={{
          display:"flex",
          flexDirection:"column", 
          alignItems:"center",
          marginTop:"10vh",
          marginBottom:"3vh"
          }}>
          <img src={logo} alt="logo" width={"200vh"} height={"200vh"} style={{opacity:0.3}}></img>
        </div>
      </div>
      <hr style={{width:"50vh", marginBottom:"3vh"}}/>
      <div className="row align-self-center justify-content-md-center">
          <h4>¡ALTO!</h4>
      </div>
      <div className="row align-self-center justify-content-md-center">
          <p>No puedes seguir con tu siguiente práctica sin antes completar la anterior o no estás 
          habilitado para realizar esta práctica, según tu carrera.
          </p>        
      </div>
      <div className="row align-self-center justify-content-md-center">
          <p><p></p> </p>        
      </div>
    </div>
    // <div className="text-center">
    //   <div style={{
    //       display:"flex",
    //       flexDirection:"column", 
    //       alignItems:"center",
    //       padding:50     
    //       }}>
    //       <img src={logo} width={"220vh"} height={"220vh"}></img>
    //     </div>  
    //     <div style={{width:"50vh",display:"flex",
    //       flexDirection:"column", 
    //       alignItems:"center",}}>
    //       <h4>¡ALTO!</h4> 
    //       <p>No puedes seguir con tu siguiente práctica sin antes completar la anterior. Por favor, completa los pasos que tengas pendientes.</p>        
    //     </div>
    
         
      
    // </div>
  )
}
