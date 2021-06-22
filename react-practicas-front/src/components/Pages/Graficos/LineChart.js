import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';

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

const LineChart = () => (
  <>
    <div className='header'>
    <motion.div  animate={{ x: 100 }}  transition={{ ease: "easeOut", duration: 2 }} ><Typography  variant="h4" >Historial de Practicas</Typography> </motion.div>
  
    </div>
    <Line data={data} options={options} />
  </>
);

export default LineChart;