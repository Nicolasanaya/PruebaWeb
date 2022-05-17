import React, { Component } from 'react';
import logo from '../img/logo.png';
import Principal from './Principal';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/QuestionAnswer/Subject";
const baseURL1 = url.url + "/QuestionAnswer/Create/Question";

class Preguntas extends Component {
    state = {
        subjects: [],
        id: '',
        observation: '',
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            id: document.getElementById('subjects').value,
            observation: document.getElementById('question').value

        })
    };

    Peticionesget = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    subjects: response.data.subjects,
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

    PostPeticiones = () => {
        const data = {
            'subject': this.state.id,
            'question': this.state.observation
        }
        // console.log(data);

        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.post(baseURL1, data, config).then(resp => {
            console.log(resp)
            if (resp.status === 200) {

                swal({
                    title: "Pregunta",
                    text: "Su Pregunta fue exitosa",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/Principal";
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
                    text: "Comuniquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 404) {
                swal({
                    title: "Pregunta",
                    text: "Comuniquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 401) {
                swal({
                    title: "Pregunta",
                    text: "Comuniquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });

            } else if (error.response.status === 500) {
                swal({
                    title: "Servicio al Cliente",
                    text: "Comuniquese con el soporte",
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
                                                        <b><h2 className="text-center mb-4">PREGUNTA</h2></b>
                                                    </section>
                                                    <form >

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >MATERIA</label>

                                                            <select className="form-select tamañoinput" aria-label="Default select example" name='subjects' id='subjects' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opcion</option>
                                                                {this.state.subjects.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>

                                                        </div>
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

export default Preguntas;