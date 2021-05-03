import React, { Component } from 'react';
import logo from'../images/logo.png';
import axios from 'axios';
import { withRouter } from 'react-router';

class FormLogin extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            pass: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        let email = this.state.user;
        let password = this.state.pass;
        axios.post(
                "http://localhost/GestionPracticas_G4/ci-practicas-back/public/login",
                {
                    email: email,
                    password: password,
                },
            )
            .then(response => {
                console.log("respuesta: ", response);
            })
            .catch(error => {
                console.log("login error: ", error);
            });
        event.preventDefault();
    }

    showcred = () => {
        console.log("user: ", this.state.user);
        console.log("pass: ", this.state.pass);
    }

    routeChange = () => {

        console.log("entra");

        if (this.state.user == "admin" && this.state.pass == "1234") {
            this.props.history.push('/admin');
        }

        if (this.state.user == "Camilo" && this.state.pass == "1234") {
            this.props.history.push('/estudiante');
        }
    }

    render(){

        return(
            <div>
                <div className="container">
                    <img src={logo} alt=""/>
                    <h6>Bienvenido</h6>
                    <h5>Ingresa con los datos de tu cuenta</h5> 

                    <form onSubmit={this.handleSubmit}>  
                        <div className="form-group">
                            <label>Correo</label>
                            <input
                                className="form-control"
                                type="user"
                                name="user"
                                placeholder="Usuario"
                                maxLength="50"
                                value={this.state.user}
                                onChange={this.handleChange}
                                ></input>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input 
                                className="form-control" 
                                type="pass" 
                                name="pass"
                                placeholder="Contraseña"
                                maxLength="50"
                                value={this.state.pass}
                                onChange={this.handleChange}
                                ></input>
                        </div>
                        <button type="submit" className="btn btn-success">Entrar</button>
                        
                    </form>
                </div> 
            </div>
        )
    }
}


export default withRouter(FormLogin);