import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const baseURL = url.url + "/Student/Id";
const baseURL1 = url.url + "/Student";

class RolesEstudiantesPerfil extends Component {
    state = {
        datosEst: '',
        photo: '',
        nameLastName: '',
        identifier: '',
        accountStatus: '',
        show: false,
        status: false
    }

    componentDidMount = () => {
        this.getRolid();
    }

    getRolid() {
        const config = {
            headers: { 'StudentId': this.state.datosEst, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }



        // console.log(config)

        axios.get(baseURL, config).then(res => {
            this.setState({
                studentInformation: res.data,
                photo: res.data.studentInformation.photo,
                identifier: res.data.studentInformation.identifier,
                nameLastName: res.data.studentInformation.nameLastName,
                accountStatus: res.data.studentInformation.accountStatus,
                status: true
            })
            // console.log(res.data)
        }).catch((error) => {
            console.log(error);
        });

    }

    handleChange = (event) => {

        this.setState({
            accountStatus: document.getElementById('accountStatus').checked
        })

    };

    putrolid = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'studentId': this.state.datosEst, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config);


        const data = {
            "accountStatus": this.state.accountStatus
        }
        console.log(data);

        axios.put(baseURL1, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "Rol",
                        text: "Su rol se actualizo con éxito",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/RolesEstudiantes";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "Rol",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {

                if (error.response.status === 500) {
                    swal({
                        title: "Nota",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Rol",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }
    render() {
        const cooki = new Cookies();
        this.state.datosEst = cooki.get('datorolest')
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '3rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">PERFIL</h2>
                                                    </section>
                                                    <form className="form">
                                                        <img className='img-perfil' src={this.state.photo} alt="perfil"></img>
                                                        <label className="text-center mb-4">-----------------------------------------------------------</label>

                                                        {/* nombre */}
                                                        <label className="text-center mb-4">{this.state.nameLastName}</label>
                                                        {/* id institucional*/}
                                                        <label className="text-center mb-4">ID: {this.state.identifier}</label>
                                                        {/* checkbox */}
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="accountStatus" name='accountStatus' checked={this.state.accountStatus} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Desabilitar o habilitar Estudiante</label>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.putrolid}>Actualizar</button>
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

export default RolesEstudiantesPerfil;