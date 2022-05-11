import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/Credenciales.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/Credential";

class Credenciales extends Component {

    state = {
        connectionDB: [],
        connectionEmail: [],
        host: '',
        dataBaseName: '',
        userName: '',
        password: '',
        stmp: '',
        port: '',
        userNameEmail: '',
        passwordEmail: '',
        status: null
    }

    componentDidMount() {
        this.CargarCredenciales();
    }

    CargarCredenciales = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    connectionDB: response.data.connectionDB,
                    connectionEmail: response.data.connectionEmail,
                    host: response.data.connectionDB.host,
                    dataBaseName: response.data.connectionDB.dataBaseName,
                    userName: response.data.connectionDB.userName,
                    password: response.data.connectionDB.password,
                    stmp: response.data.connectionEmail.stmp,
                    port: response.data.connectionEmail.port,
                    userNameEmail: response.data.connectionEmail.userName,
                    passwordEmail: response.data.connectionEmail.password,
                    status: true
                })

            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = () => {
        this.setState({
            host: document.getElementById('host').value,
            dataBaseName: document.getElementById('dataBaseName').value,
            userName: document.getElementById('userName').value,
            password: document.getElementById('password').value,
            stmp: document.getElementById('stmp').value,
            port: document.getElementById('port').value,
            userNameEmail: document.getElementById('userNameEmail').value,
            passwordEmail: document.getElementById('passwordEmail').value
        })
    };

    PostHorario = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config);

        const data = {
            "connectionDB": {
                "host": this.state.host,
                "dataBaseName": this.state.dataBaseName,
                "userName": this.state.userName,
                "password": this.state.password,
            },
            "connectionEmail": {
                "stmp": this.state.stmp,
                "port": this.state.port,
                "userName": this.state.userNameEmail,
                "password": this.state.passwordEmail,
            },
        }
        console.log(data);

        axios.post(baseURL, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "CREDENCIALES",
                        text: "Su credenciales fue Asignada",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Credenciales";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "CREDENCIALES",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {

                if (error.response.status === 500) {
                    swal({
                        title: "CREDENCIALES",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "CREDENCIALES",
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
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '5rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <div className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">CREDENCIALES</h2>
                                                    </div>
                                                    <form >
                                                        <h3 className="text-center mb-4">Credenciales de Conexion base de datos</h3>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">host</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name='host' id='host' defaultValue={this.state.host} onChange={this.handleChange}></input>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">dataBase Name</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="dataBaseName" id='dataBaseName' defaultValue={this.state.dataBaseName} onChange={this.handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">userName</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="userName" id='userName' defaultValue={this.state.userName} onChange={this.handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">password</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="password" id='password' defaultValue={this.state.password} onChange={this.handleChange} />

                                                            </div>
                                                        </div>

                                                        <h3 className="text-center mb-4">Conexion Email</h3>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">stmp</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name='stmp' id='stmp' defaultValue={this.state.stmp} onChange={this.handleChange}></input>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">port</label>
                                                            <div className="col-sm-9">
                                                                <input type="number" className="form-control" name="port" id='port' defaultValue={this.state.port} onChange={this.handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">user Name Email</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="userNameEmail" defaultValue={this.state.userNameEmail} id='userNameEmail' onChange={this.handleChange} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">password Email</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="passwordEmail" defaultValue={this.state.passwordEmail} id='passwordEmail' onChange={this.handleChange} />

                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark boton-color" onClick={this.PostHorario}>MODIFICAR</button>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Credenciales;