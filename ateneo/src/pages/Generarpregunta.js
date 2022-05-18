import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/QuestionAnswer/Question/Student";


class Generarpregunta extends Component {
    state = {
        subjects: [],
        id: '',
        question: '',
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            question: document.getElementById('question').value
        })
    };

    PostPeticiones = () => {
        const data = {
            'message': this.state.question
        }
        // console.log(data);

        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.post(baseURL, data, config).then(resp => {
            console.log(resp)
            if (resp.status === 200) {

                swal({
                    title: "Pregunta",
                    text: "Su Pregunta fue exitosa",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location.reload(true);
                })
            } if (resp.status === 400) {
                swal({
                    title: "Pregunta",
                    text: "No se encontro la Pregunta",
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
                    title: "Pregunta",
                    text: "Comuníquese  con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 404) {
                swal({
                    title: "Pregunta",
                    text: "Comuníquese  con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 401) {
                swal({
                    title: "Pregunta",
                    text: "Comuníquese  con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });

            } else if (error.response.status === 500) {
                swal({
                    title: "Servicio al Cliente",
                    text: "Comuníquese  con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
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
                                                        <b><h2 className="text-center mb-4">GENERAR PREGUNTA</h2></b>
                                                    </section>
                                                    <form >
                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >PREGUNTA</label>
                                                            <textarea type="text" className="form-control mb-4" onChange={this.handleChange} name="question" id='question' />
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.PostPeticiones}>CREAR</button>
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

export default Generarpregunta;