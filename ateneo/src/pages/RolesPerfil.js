import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const baseURL = url.url + "/Teacher/Id";
const baseURL1 = url.url + "/Teacher";



class RolesPerfil extends Component {
    state = {
        datos: '',
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
            headers: { 'teacherId': this.state.datos, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }



        // console.log(config)

        axios.get(baseURL, config).then(res => {
            this.setState({
                teacherInformation: res.data,
                photo: res.data.teacherInformation.photo,
                identifier: res.data.teacherInformation.identifier,
                nameLastName: res.data.teacherInformation.nameLastName,
                accountStatus: res.data.teacherInformation.accountStatus,
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
            headers: { 'teacherId': this.state.datos, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
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
                        window.location = "/Roles";
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
        this.state.datos = cooki.get('datorol')
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
                                                        <img className='img-perfil' alt="perfil" src={this.state.photo}></img>
                                                        <label className="text-center mb-4">-----------------------------------------------------------</label>

                                                        {/* nombre */}
                                                        <label className="text-center mb-4">{this.state.nameLastName}</label>
                                                        {/* id institucional*/}
                                                        <label className="text-center mb-4">ID: {this.state.identifier}</label>
                                                        {/* checkbox */}
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="accountStatus" name='accountStatus' checked={this.state.accountStatus} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Deshabilitar  o habilitar Docente</label>
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

export default RolesPerfil;