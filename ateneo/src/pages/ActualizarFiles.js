import React, { Component } from 'react';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../img/logo.png';
import swal from 'sweetalert';

const baseURL = url.url + "/File";
const baseURL1 = url.url + "/Picture";
const baseURL2 = url.url + "/TermintermsAndConditions";

class ActualizarFiles extends Component {
    state = {
        picture: [],
        idpicture: '',
        namepicture: '',
        urlpicture: '',
        Introduction: '',
        termintermsandconditions: [],
        idtermintermsandconditions: '',
        nametermintermsandconditions: '',
        urltermintermsandconditions: '',
        Photo: null,
        show: false,
        status: false
    }

    Peticionesgetfoto = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        // console.log(config)
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    picture: response.data.picture,
                    idpicture: response.data.picture.id,
                    namepicture: response.data.picture.name,
                    urlpicture: response.data.picture.url,
                    status: true
                })
                console.log(response.data)
            })

            .catch((error) => {
                console.log(error);
            });

    }

    Peticionesget = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        // console.log(config)
        axios.get(baseURL2, config)
            .then(response => {
                this.setState({
                    termintermsandconditions: response.data.termintermsandconditions,
                    idtermintermsandconditions: response.data.termintermsandconditions.id,
                    nametermintermsandconditions: response.data.termintermsandconditions.name,
                    urltermintermsandconditions: response.data.termintermsandconditions.url,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.Peticionesget();
        this.Peticionesgetfoto();
    }

    fileSelectedHandler = (event) => {
        let Photo = event.target.files[0];
        this.setState({ Photo: Photo });

    }

    handleChange = (event) => {

        this.setState({
            Introduction: document.getElementById('Solicitud').value,
        })
    };

    fileUploadHandler = () => {
        // event.preventDefault();

        const Photo = this.state.Photo;
        const formData = new FormData();
        formData.append('Id', this.state.Introduction);
        formData.append('File', Photo);

        const config = {
            headers: { 'content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.put(baseURL, formData, config)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {

                    swal({
                        title: "ACTUALIZACION ",
                        text: "Su actualizacion fue creada exitosomente",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Principal";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                console.log(error.response.status);
                if (error.response.status === 500) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Verifique los campos ",
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
                                    <div className='card' style={{ borderRadius: '3rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <b><h2 className="text-center mb-4">ACTUALIZACION ARCHIVOS</h2></b>
                                                    </section>

                                                    <form className="mb-4">

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Tipo de Solicitud</label>
                                                            <div className="col-sm-9">
                                                                <select className="form-select" aria-label="Default select example" name="Solicitud" id='Solicitud' onChange={this.handleChange}>
                                                                    <option value="100">Seleccione una opcion</option>
                                                                    <option id={this.state.idpicture} value={this.state.idpicture}>Foto Pricipal</option>
                                                                    <option id={this.state.idtermintermsandconditions} value={this.state.idtermintermsandconditions}>Terminos y Condiciones</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">ADJUNTAR ARCHIVO</label>
                                                            <div className="col-sm-8">
                                                                <input type="file" id="AnswerFile" multiple name="AnswerFile" onChange={this.fileSelectedHandler} />
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" onClick={this.fileUploadHandler} className="btn btn-outline-dark form-label boton-color" >CREAR</button>
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
            </div >
        );
    }
}

export default ActualizarFiles;