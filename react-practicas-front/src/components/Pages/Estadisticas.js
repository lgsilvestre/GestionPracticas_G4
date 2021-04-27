import React from 'react'
import { ColumnChart } from '../Graficos/ColumnChart'
import { LineChart } from '../Graficos/LineChart'
import { PieChart } from '../Graficos/PieChart'

export const Estadisticas = () => {
    return (
        <div>
            <h1>Estadisticas</h1>
            <hr/>
            <div className="container">
                <div className= "row">
                    <div className = "col ">
                        <ColumnChart/>
                    </div>
                    <div className = " col" >
                        <PieChart/>
                    </div>
                </div>

                <div className="row">
                    <LineChart/>
                </div>

            </div>
            
        </div>
    )
}
