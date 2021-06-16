import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import logo from '../images/logo.png';
import { Alert } from 'reactstrap';
import './EstilosSignInSide.css';
import { fade } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://utalca.cl/">
        Gestión de Prácticas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Logos() {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <Grid item xs={6} align="center" justify="center">        
        <img alt="" src={process.env.PUBLIC_URL + '/images/logos/utal.png'} style={{width:"70%",height:'auto'}} />       
      </Grid>
      <Grid item xs={6} align="center" justify="center">
        <img alt="" src={process.env.PUBLIC_URL + '/images/logos/facultad.png'} style={{width:"100%",height:'auto'}} />
      </Grid>
    </Grid>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let number = getRandomInt(4);
number = number + 1;
let textimg = "/images/login/uni" + number + ".jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(' + textimg + ')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(4, 4, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  estilosLogos: {
    marginTop: '10px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#0cc',
  },
  form: {
    width: '75%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: '#4527a0',
  },
  input: {
    '&:hover': {
      border: '#7953d2',
      borderRadius: 4,
    },
    '&$focused': {
      boxShadow: `${fade('#7953d2', 0.2)} 0 0 0 0.2rem`,
    },
  },
}));

export default function SignInSide({ history }) {
  const classes = useStyles();
  const emailRef = React.useRef('');
  const passwordRef = React.useRef('');
  const [wrongPass, setwrongPass] = useState(false)
  //Se inicializan las coockies
  const cookies = new Cookies();
  const handleWrongPass = () => {
    setwrongPass(true)
  }
  const sendValues = (event) => {
    event.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    axios.post(
      "http://localhost/GestionPracticas_G4/ci-practicas-back/public/login",
      {
        email: email,
        password: password,
      },
    )
      .then(response => {
        //trabajar redireccionamiento
        //-1 error , 0 alumno , 1 admin
        console.log("respuesta: ", response.data);

        if (response.data.tipo === 1 || response.data.tipo === 2) {
          console.log("admin")
          history.replace("/admin")
        }
        else if (response.data.tipo === 3) {
          console.log("estudiante")
          // Se setean las coockies
          cookies.set('id', response.data['id_alumno'], { path: '/' });
          cookies.set('name', response.data['nombre'], { path: '/' });
          history.replace("/estudiante")
        }
        else {
          console.log("error credenciales")
          handleWrongPass()
        }
      })
      .catch(error => {
        console.log("login error: ", error);
      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img className="mb-4" src={logo} alt="" />
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form className={classes.form} onSubmit={sendValues} noValidate>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            {
              wrongPass && (
                <Alert color="info">
                  Usuario o contraseña incorrectas.
                </Alert>)
            }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Acceder
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  ¿No tienes una cuenta?
                </Link>
              </Grid>
            </Grid>
            <Logos className={classes.estilosLogos}/>
            <Box mt={1} mb={1} alignItems="flex-end">
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}