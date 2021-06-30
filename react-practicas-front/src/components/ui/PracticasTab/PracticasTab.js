import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      // maxWidth: 60,
      width: '100%',
      backgroundColor: 'white',
    },
  },
})((props) => <Tabs {...props} ink TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'white',
    fontSize:30,
    fontWeight:'bold',
    fontSize: theme.typography.pxToRem(17),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
      // backgroundColor:"#132038"
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export const PracticasTab = ({nroPractica,mostrarPractica}) => {
  const nroTab = nroPractica-1
  // console.log("Tab actual:",nroTab)
  const handleChange = (event, newValue) => {
    // console.log("orden mostrar: ",newValue)
    console.log("Mostrando practica ",newValue+1)
    mostrarPractica(newValue+1)
    // setNroPractica(newValue)
  }
  // "#8EADE8"
  return (
    <div style={{backgroundColor:"#2D4C85"}}>
      <div className="container" >
        <div className="row" >
          <div className="col">      
            <div style={{backgroundColor: '#2D4C85'}}>
              <StyledTabs  value={nroTab} onChange={handleChange} aria-label="styled tabs example">
                <StyledTab label="Práctica 1"/>
                <StyledTab label="Práctica 2" />
                <StyledTab label="Práctica 3" />
              </StyledTabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
