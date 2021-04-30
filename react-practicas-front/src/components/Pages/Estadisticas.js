import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ColumnChart } from '../Graficos/ColumnChart'
import { LineChart } from '../Graficos/LineChart'
import { PieChart } from '../Graficos/PieChart'

export const Estadisticas = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () =>{
        setDropdownOpen(!dropdownOpen)
    }
    return (
        <div>
            <h1>Estadisticas</h1>
            <hr/>       
            <div className="container">
                <div className="row">

                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Filtrar por
                </DropdownToggle>
                <DropdownMenu>                 
                    <DropdownItem>Año</DropdownItem>
                    <DropdownItem>Carrera</DropdownItem>
                    <DropdownItem>Escuela</DropdownItem>
                    {/* <DropdownItem text>Dropdown Item Text</DropdownItem> */}
                    {/* <DropdownItem disabled>Action (disabled)</DropdownItem> */}
                    {/* <DropdownItem divider /> */}
                </DropdownMenu>
                </Dropdown>

                    <div className="col-sm-9">
                        <div className= "row justify-content-md-center">
                            <div className = "col ">
                                <ColumnChart/>
                            </div>
                            <div className = " col" >
                                <PieChart/>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 justify-content-md-center">
                            <LineChart/>
                        </div>
                    </div>
                    
                </div>

                
            </div>
            
        </div>
    )
}
