import CanvasJSReact  from '../../assets/canvasjs.react'
import React from 'react'

export const ColumnChart = () => {
      
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        title: {
            text: "Basic Column Chart in React"
        },
        data: [{				
            type: "column",
            dataPoints: [
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  }
            ]
        }]
    }
    return (
        <div className="card">
            <CanvasJSChart options ={options}/>       
        </div>
        
    )
}
