import React, { Component } from 'react';
import '../css/Login.css'
import logo from '../img/logo.png';
import Principal from './Principal';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/Petition";

class Pqr extends Component {
    state = {
        requestTypes: [],
        id: '',
        observation: '',
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            id: document.getElementById('Petition').value,
            observation: document.getElementById('observation').value

        })
    };

    PostPeticiones = () => {
        const data = {
            'requestType': this.state.id,
            'observation': this.state.observation
        }
        console.log(data);

        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.post(baseURL, data, config).then(resp => {
            console.log(resp)
            if (resp.status === 200) {

                swal({
                    title: "petición ",
                    text: "Su petición  fue exitosa",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location.reload(true);
                })
            } if (resp.status === 400) {
                swal({
                    title: "petición ",
                    text: "No se encontro la petición ",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }

        ).catch(function (error) {
            // console.log(res); 
            if (error.response.status === 400) {
                swal({
                    title: "petición ",
                    text: "Comuníquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 404) {
                swal({
                    title: "petición ",
                    text: "Comuníquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 401) {
                swal({
                    title: "petición ",
                    text: "Comuníquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });

            } else if (error.response.status === 500) {
                swal({
                    title: "Servicio al Cliente",
                    text: "Comuníquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            }
        })
    }

    Peticionesget = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    requestTypes: response.data.requestTypes,
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
                                                    </section>
                                                    <form >

                                                        <b><h2 className="text-center mb-4">PETICIONES</h2></b>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" className=" mb-4">TIPO DE PETICIÓN</label>
                                                           
                                                                <select className="form-select tamañoinput" aria-label="Default select example" name='Petition' id='Petition' onChange={this.handleChange}>
                                                                    <option value="100">Seleccione una opcion</option>
                                                                    {this.state.requestTypes.map(element => (
                                                                        <option key={element.id} value={element.id} >{element.name}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            
                                                        </div>
                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" className="mb-4">OBSERVACION</label>
                                                        
                                                                <textarea type="text"  className="form-control mb-4" onChange={this.handleChange} name="observation" id='observation' />

                                                        </div>




                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.PostPeticiones}>ACTUALIZAR</button>
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

export default Pqr;