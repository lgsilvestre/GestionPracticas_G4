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
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export const PracticasTab = ({nroPractica, setNroPractica}) => {

  const handleChange = (event, newValue) => {
    setNroPractica(newValue)
  }
  // "#8EADE8"
  return (
    <div style={{backgroundColor:"#2D4C85"}}>
      <div className="container" >
        {/* <div className="row justify-content-md-center" >
          <div className="col" style={{marginTop:10}}>
            <h2 style={{color:"white"}}>Prácticas disponibles</h2>
          </div>
        </div> */}
        <div className="row" >
          <div className="col">      
            <div style={{backgroundColor: '#2D4C85'}}>
              <StyledTabs value={nroPractica} onChange={handleChange} aria-label="styled tabs example">
                <StyledTab label="Práctica 1" />
                <StyledTab label="Práctica 2" />
                <StyledTab label="Práctica 3" />
              </StyledTabs>
            </div>
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    </div>
  )
}
