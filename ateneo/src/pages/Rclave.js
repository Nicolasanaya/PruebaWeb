import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../css/Login.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
import fondo from '../img/image.png'


const baseURL = url.url + "/RecoveryPassword";
const baseURL1 = url.url + "/RecoveryPassword/New-Password";

class Rclave extends Component {
    state = {
        code: '',
        password: '',
        email: '',
        status: false
    }
    handleChange = (event) => {
        this.setState({
            code: document.getElementById('code').value,
            password: document.getElementById('password').value,
            email: document.getElementById('Email').value
        })
    };

    PostContraseña = (event) => {

        // event.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        // console.log(config);

        const data = {
            "code": this.state.code,
            "password": this.state.password
        }
        console.log(data);

        axios.post(baseURL1, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "Contraseña",
                        text: "Su Contraseña fue Asignada",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "Contraseña",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                // console.log(res.status);

                if (error.response.status === 500) {
                    swal({
                        title: "Contraseña",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Contraseña",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }

    PostEmail = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        // console.log(config);

        const data = {

            "email": this.state.email,

        }
        console.log(data);

        axios.post(baseURL, data, config)
            .then(res => {
                // console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "CODIGO",
                        text: "Su CODIGO fue Asignado",
                        icon: "success",
                        buttons: "Aceptar"
                    })
                } if (res.status === 400) {
                    swal({
                        title: "CÓDIGO",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "CÓDIGO",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "CÓDIGO",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }

    render() {
        return (
            <section className='vh-100 img-fluid' style={{ backgroundImage: `url(${fondo})`, backgroundSize: '100% 100%' }}>
                <div className='py-5 h-100'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className=''>
                            <div className='card' style={{ borderRadius: '1rem' }}>
                                <div className=''>
                                    <div className='align-items-center'>
                                        <div className=' p-4 p-lg-5 text-black'>
                                            <div className="centrarelementos form">
                                                <img className="logo" src={logo} alt="logo"></img>
                                            </div>
                                            <form >

                                                <h3 className="text-center mb-4">Recuperar Contraseña</h3>
                                                

                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label">Correo Institucional</label>
                                                    <input type="email" className="form-control" name='Email' id='Email' required pattern="^\S+(@upb.edu.co)+$" onChange={this.handleChange}></input>
                                                </div>

                                                <div className="mb-4 centrarelementos">
                                                    <button type="button" className="btn btn-outline-dark form-label boton-color" id='boton' onClick={this.PostEmail}>SOLICITAR CODIGO</button>
                                                </div>
                                                <div id='div-mostrar'>

                                                    <div className="form-outline mb-4">
                                                        <label htmlFor="text" className="col-form-label">Código</label>
                                                        <input type="text" className="form-control" name='code' id='code' onChange={this.handleChange} required></input>
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label htmlFor="text" className="col-form-label">Contraseña</label>
                                                        <input type="password" className="form-control" name='password' id='password' onChange={this.handleChange} required></input>
                                                    </div>

                                                    <div className="mb-4 centrarelementos">
                                                        <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.PostContraseña}>ACTUALIZAR</button>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Rclave;