import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const baseURL = url.url + "/Petition/Id";
const baseURL1 = url.url + "/Petition";

class ValidarPeticiones extends Component {
    state = {
        datosEst: '',
        observation: '',
        nameLastName: '',
        email: '',
        id: '',
        requestType: '',
        accountStatus: false,
        show: false,
        status: false
    }

    componentDidMount = () => {
        this.getPeticionid();
    }

    getPeticionid() {
        const config = {
            headers: { 'petitionId': this.state.datosEst, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config).then(res => {
            this.setState({
                petition: res.data,
                id: res.data.petition.id,
                nameLastName: res.data.petition.nameLastName,
                email: res.data.petition.email,
                requestType: res.data.petition.requestType,
                observation: res.data.petition.observation,
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

    putPeticionId = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'petitionId': this.state.datosEst, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config);


        const data = {
            "state": this.state.accountStatus
        }
        console.log(data);

        axios.put(baseURL1, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "Peticion",
                        text: "Su Peticion se actualizo con exito",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Peticiones";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "Peticion",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {

                if (error.response.status === 500) {
                    swal({
                        title: "Peticion",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Peticion",
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
        this.state.datosEst = cooki.get('datosPeticiones')
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
                                                        <h2 className="mb-4">PETICION</h2>
                                                    </section>
                                                    <form className="form">

                                                        <b><label htmlFor="text">Nombres</label></b>
                                                        <label className="mb-4">{this.state.nameLastName}</label>


                                                        <b><label htmlFor="text" >Email</label></b>
                                                        <label className="mb-4">{this.state.email}</label>


                                                        <b><label htmlFor="text" >Tipo de Peticion</label></b>
                                                        <label className="mb-4">{this.state.requestType}</label>

                                                        <b><label htmlFor="text">Observacion</label></b>
                                                        <label className="mb-4">{this.state.observation}</label>


                                                        {/* checkbox */}
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="accountStatus" name='accountStatus' checked={this.state.accountStatus} onChange={this.handleChange} />
                                                            <b><label className="form-check-label" htmlFor="laboratoryState">Validar Peticion</label></b>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <button type="button" className="btn btn-outline-dark boton-color col-sm-6" onClick={this.putPeticionId}>Aceptar</button>
                                                            <div className="col-sm-6">
                                                                <a className="link" href="/Peticiones"> <button type="button" className="btn btn-outline-dark boton-color" onClick={this.putrolid}>Regresar</button></a>
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

                    </div>

                </div>
            </div>
        );
    }
}

export default ValidarPeticiones;