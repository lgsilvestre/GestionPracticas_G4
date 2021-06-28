import React from 'react'
import { Input } from 'reactstrap'

export const Comentario = ({mensaje ="Lorem fistrum ese pedazo de no te digo"+ 
"trigo por no llamarte Rodrigor pupita. Caballo blanco caballo"+
"negroorl de la pradera sexuarl torpedo por la gloria de mi madre"+
"no te digo trigo por no llamarte Rodrigor se calle ustée a wan ese "+
"pedazo de. Quietooor caballo blanco caballo negroorl me cago en tus"+
"muelas al ataquerl a peich qué dise usteer ese que llega diodeno "+
"está la cosa muy malar jarl por la gloria de mi madre. La caidita "+
"jarl apetecan ahorarr."}) => {

  return (
    <div>
      <div>
          <Input 
            value={mensaje}
            style={{
              backgroundColor:"#fff", 
              //height:"150px", 
              marginBottom:"10px",
              minHeight:"60px"
            }}
            type="textarea" 
            invalid="true" 
            disabled="disabled"
            />
        </div>
    </div>
  )
}
