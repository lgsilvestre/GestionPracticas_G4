import React, {useEffect, useState}  from 'react';
import { Pie } from 'react-chartjs-2';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


export default function PieChart()  {
{/* cantidad de practicas por region de los graficos */}
const [cantidades , setCantidades ] = useState()
const [regiones , setregiones ] = useState()

{/* captura de cantidades */}
useEffect(() => {
  axios.get(
    ""
  )
    .then(response => {
      let respuesta = response.data;
      setCantidades(respuesta);

    })
    .catch(error => {
      console.log("login error: ", error);
    });
}, []);

{/* captura de regiones */}
useEffect(() => {
  axios.get(
    ""
  )
    .then(response => {
      let respuesta = response.data;
      setregiones(respuesta);

    })
    .catch(error => {
      console.log("login error: ", error);
    });
}, []);

const data = {
  labels: regiones,
  datasets: [
    {
      label: 'Cantidad de practicas',
      data: cantidades,
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 159, 64,0.4)',
        'rgba(85, 135, 118,0.4)',
        'rgba(218, 0, 55,0.4)',
        'rgba(242, 218, 195,0.4)',
        'rgba(64, 34, 24,0.4)',
        'rgba(71, 89, 126,0.4)',
        'rgba(81, 18, 129,0.4)',
        'rgba(255, 0, 255,0.4)',
        'rgba(65, 105, 225,0.4)',
        'rgba(0, 250, 154,0.4)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(85, 135, 118,1)',
        'rgba(218, 0, 55,1)',
        'rgba(242, 218, 195,1)',
        'rgba(64, 34, 24,1)',
        'rgba(71, 89, 126,1)',
        'rgba(81, 18, 129,1)',
        'rgba(255, 0, 255,1)',
        'rgba(65, 105, 225,1)',
        'rgba(0, 250, 154,1)'



      ],
      borderWidth: 1,
    },
  ],
};

return(
  <>
    <div className='header'>
    <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} ><Typography  variant="h4" >Regiones</Typography> </motion.div>
    </div>
    <Pie data={data} />
  </>
)

}