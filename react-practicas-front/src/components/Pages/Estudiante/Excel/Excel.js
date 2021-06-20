import React, { useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import Button from '@material-ui/core/Button';
import useStyles from '../Excel/ExcelStyle';
import Input from '@material-ui/core/Input';

//import { Tooltip } from '@material-ui/core';

const EXTENSIONS = ['xlsx', 'xls', 'csv']
const headerTable = ['Nombre carrera','Codigo Carrera','Matricula','RUT','Nombre Alumno','Correo Institucional','Correo Personal','Sexo','Fecha Nacimiento','Plan','Año Ingreso','Via Ingreso','Situcacion Actual','Situacion Actual Año','Situacion Actual Periodo','Regular','Comuna Origen','Region','Nivel','Porcentaje Avance','Ultima Puntuacion Prioridad','Al Día','Nivel 99 Aprobado']
export default function  Excel() {
  const classes = useStyles();
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()

  //const [selectedRows, setSelectedRows] = useState()
  /*
  const [estudiante , setEstudiante ]=useState({
    nombre: '',
    correo_ins: '',    
    correo_per: '',
    password: '',
    matricula: '',
    cod_carrera: '',
    rut: '',
    fecha_nac: '',
    plan: '',
    via_ingreso: '',
    anho_ingreso: '',
    sit_actual: '',
    sit_actual_anho: '',
    sit_actual_periodo: '',
    regular: '',
    comuna_origen: '',
    region: '',
    nivel: '',
    porc_avance: '',
    ult_punt_prio: '',
    al_dia: '',
    nivel_99_aprobado: ''
  })
  */
  const peticionPost = async(fila)=>{
      
      await axios.post("", 
        {
          nombre: fila.nombre,
          correo_ins:fila.correo_ins,
          correo_per:fila.correo_per,
          matricula:fila.matricula,
          nbe_carrera:fila.nbe_carrera,
          cod_carrera:fila.cod_carrera,
          rut:fila.rut,
          sexo:fila.sexo,
          fecha_nac:fila.fecha_nac,
          plan:fila.plan,
          via_ingreso:fila.via_ingreso,
          anho_ingreso:fila.anho_ingreso,
          sit_actual:fila.sit_actual,
          sit_actual_anho:fila.sit_actual_anho,
          sit_actual_periodo:fila.sit_actual_periodo,
          regular:fila.regular,
          comuna_origen:fila.comuna_origen,
          region:fila.region,
          nivel:fila.nivel,
          porc_avance:fila.porc_avance,
          ult_punt_prio:fila.ult_punt_prio,
          al_dia:fila.al_dia,
          nivel_99_aprobado:fila.nivel_99_aprobado
        },
      )
      .then(response => {
        console.log("Datos Enviados: " ,response)
        if(response.data === true){
          console.log("Es true")
        }
      })
      .catch(error => {console.log("Error enviando datos ", error)
      })
      
    }
  
  /*
  const enviarAlumnos = (data) => {
    data.forEach(row => {
      //let rowData = {}
      row.forEach((estudiante, index) => {
        console.log()
        //realiza la peticion al metodo post
        //peticionPost(estudiante)
      })
    });
  }
  */
  


  //funcion para obteber el formato de un archivo 
  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) 
    // return boolean
  }

  /*
  const handleBulkDelete = () => {
    const updateData = data.filter(row=>!selectedRows.includes(row))
    setData(updateData)
  }
  */

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })

      rows.push(rowData)

    });
    return rows
  }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convierte a string
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      console.log(fileData)
      const headers = headerTable
      const heads = headers.map(head => ({ title: head, field: head }))
      setColDefs(heads)
      

      //elimino la cabecera
      fileData.splice(0, 1)
      setData(convertToJson(headers, fileData))
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Archivo invalido, seleccione un archivo formato csv o xlsx")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }
  const subirArchivos = () =>{
    <div>
      
    </div>

    
  }
  return (
    <div>
      <h4 align='center'>Importe alumnos usando un archivo csv o xlsx</h4>
      <Input type="file" onChange={importExcel}> </Input>

      <MaterialTable
        //setEstudiante={setEstudiante}
        //estudiante={estudiante}
        title="Vista previa de los Alumnos en el archivo" 
        data={data} 
        columns={colDefs}
        //onSelectedChange = {(rows) => setSelectedRows(rows)}
        options={{
          selection:true }}
        
        actions={[
          {
            icon:'delete',
            tooltip : "las columnas seleccionadas se eliminaran de la vista previa ", 
            //onClick:()=>handleBulkDelete()

          }
        ]}
        
      />
      <Button className={classes.boton} onClick={() => subirArchivos()} >Agregar Estudiantes</Button>
    </div>
  );
}
