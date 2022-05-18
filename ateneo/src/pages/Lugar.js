import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';


const baseURL = url.url + "/Place";
const baseURL1 = url.url + "/Place/Id";



class Lugar extends Component {
    state = {
        places: [],
        placescreate: '',
        Petition: '',
        place: '',
        placename: '',
        status: false

    }

    Peticionesget = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    places: response.data.places,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    Peticionesgetid = () => {
        const config = {
            headers: { 'placeId': this.state.Petition, 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    placename: response.data.place.name,
                    status: true
                })

            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.Peticionesget();
    }

    handleChange = (e) => {
        this.setState({
            Petition: document.getElementById('Petition').value,
            place: document.getElementById('place').value,
            placescreate: document.getElementById('placescreate').value

        })
    };

    CrearPost = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        const data = {
            "name": this.state.placescreate
        }


        axios.post(baseURL, data, config).then(
            res => {
                if (res.status === 200) {

                    swal({
                        title: "LUGAR",
                        text: "El lugar se creo exitosamente",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Lugar";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "LUGAR",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }
        )
            .catch(function (error) {
                if (error.response.status === 500) {
                    swal({
                        title: "LUGAR",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 401) {
                    swal({
                        title: "LUGAR",
                        text: "No tiene autorizacion",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "LUGAR",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })


    }

    CrearPut = () => {
        const config = {
            headers: { 'placeId' : document.getElementById('Petition').value ,'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        const data = {
            "name": this.state.place
        }


        axios.put(baseURL, data, config).then(
            res => {
                if (res.status === 200) {

                    swal({
                        title: "LUGAR",
                        text: "El lugar se Actualizo exitosamente",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Lugar";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "LUGAR",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }
        )
            .catch(function (error) {
                if (error.response.status === 500) {
                    swal({
                        title: "LUGAR",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 401) {
                    swal({
                        title: "LUGAR",
                        text: "No tiene autorizacion",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "LUGAR",
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
                                    <div className='card' style={{ borderRadius: '1rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo" ></img>
                                                        <b><h2 className="text-center mb-4">LUGAR DE TUTORÍAS</h2></b>
                                                    </section>
                                                    <form >

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >LUGARES</label>

                                                            <select className="form-select tamañoinput" aria-label="Default select example" name='Petition' id='Petition' onClick={this.Peticionesgetid} onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opción</option>
                                                                {this.state.places.map(element => (
                                                                    <option key={element.name} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >MODIFICAR LUGAR</label>
                                                            <div className="col-sm-12">
                                                                <input type="text" className="form-control" name="place" defaultValue={this.state.placename} id='place' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.CrearPut}>ACTUALIZAR</button>
                                                        </div>

                                                        <b><h2 className="text-center mb-4">CREAR LUGAR TUTORÍAS</h2></b>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" > LUGAR</label>
                                                            <div className="col-sm-12">
                                                                <input type="text" className="form-control" name="placescreate" id='placescreate' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.CrearPost}>CREAR</button>
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

export default Lugar;