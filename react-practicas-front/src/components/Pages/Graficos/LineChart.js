import React, {useEffect, useState}  from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


export default function LineChart () {
  {/* cantidad de practicas por anio de los graficos */}
  const [cantidades , setCantidades ] = useState([])
  {/* Historial de anios */}
  const [anios , setAnios ] = useState([])

  {/* captura de cantidades */}
useEffect(() => {
  axios.get(
    ""
  )
    .then(response => {
      let respuesta = JSON.parse(response.data);
      setCantidades(respuesta);

    })
    .catch(error => {
      console.log("login error: ", error);
    });
}, []);

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Cantidad de Practicas ',
      data: [12, 19, 3, 5, 2, 3],
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
