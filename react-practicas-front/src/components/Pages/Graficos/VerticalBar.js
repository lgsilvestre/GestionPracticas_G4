import React, {useEffect, useState}  from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';



export default function VerticalBar() {
{/* cantidad de practicas por carrera de los graficos */}
  const [cantidades , setCantidades ] = useState()

  {/* captura de cantidades */}
  useEffect(() => {
    axios.get(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/getCantidadPracticasCarreras"
    )
      .then(response => {
        let respuesta = response.data;
        setCantidades(respuesta);

      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }, []);

const data = {
  labels: ['Computacion', 'Industrial', 'Mineria', 'Mecanica', 'Mecatronica', 'Electrica'],
  datasets: [
    {
      label: 'Cantidad de Practicas ',
      data: cantidades,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
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
    <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} ><Typography  variant="h4" >Carreras</Typography> </motion.div>
    </div>
    <Bar data={data} options={options} />
  </>
);
}

