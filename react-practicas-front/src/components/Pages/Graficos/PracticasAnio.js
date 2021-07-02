import React, {useEffect, useState}  from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


export default function PracticasAnio () {
  {/* cantidad de practicas por anio de los graficos */}
  const [cantidades , setCantidades ] = useState()
  {/* Historial de anios */}
  const [anios , setAnios ] = useState()

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

{/* captura de anios */}
useEffect(() => {
  axios.get(
    ""
  )
    .then(response => {
      let respuesta = response.data;
      setAnios(respuesta);

    })
    .catch(error => {
      console.log("login error: ", error);
    });
}, []);

const data = {
  labels: anios,
  datasets: [
    {
      label: 'Cantidad de Practicas ',
      data: cantidades,
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

return (
  <>
    <div className='header'>
    <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} ><Typography  variant="h4" >Historial de Practicas</Typography> </motion.div>
  
    </div>
    <Line data={data} options={options} />
  </>
);
}
