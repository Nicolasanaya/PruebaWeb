import React, { Component } from 'react';
import logo from '../img/logo.png';
import Principal from './Principal';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

const baseURL = url.url + "/SatisfactionSurvey/Subjects";
const baseURL1 = url.url + "/SatisfactionSurvey/ReasonConsultation";
const baseURL2 = url.url + "/SatisfactionSurvey/AthenaeumExperience";
const baseURL3 = url.url + "/SatisfactionSurvey";

function extractParameters(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ES extends Component {
    state = {
        subjects: [],
        reasonConsultations: [],
        athenaeumExperiences: [],
        identifier: '',
        subject: '',
        athenaeumExperienceId: '',
        reasonConsultationId: '',
        suggestion: '',
        status: false
    }    
    
    CargarMaterias = () => {
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

    CargarMotivo = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    reasonConsultations: response.data.reasonConsultations,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    CargarExperiencia = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL2, config)
            .then(response => {
                this.setState({
                    athenaeumExperiences: response.data.athenaeumExperiences,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.CargarMaterias();
        this.CargarMotivo();
        this.CargarExperiencia();

    }
    
    handleChange = (e) => {
        this.setState({
            identifier: document.getElementById('Identifier').value,
            subject: document.getElementById('subjects').value,
            athenaeumExperienceId: document.getElementById('athenaeumExperienceId').value,
            reasonConsultationId: document.getElementById('reasonConsultationId').value,
            suggestion: document.getElementById('suggestion').value
        })
    };

    PostPeticiones = () => {
        const data = {
            'identifier': this.state.identifier,
            'subject': this.state.subject,
            'athenaeumExperienceId': this.state.athenaeumExperienceId,
            'reasonConsultationId': this.state.reasonConsultationId,
            'suggestion': this.state.suggestion
        }
        // console.log(data);

        const config = {
            headers: { 'queryId':  this.props.params.id, 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config)

        axios.post(baseURL3, data, config).then(resp => {
            console.log(resp)
            if (resp.status === 200) {

                swal({
                    title: "ENCUESTA",
                    text: "Su Encuesta fue exitosa",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/";
                })
            } if (resp.status === 400) {
                swal({
                    title: "ENCUESTA",
                    text: "No se realizo la Encuesta",
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
                    title: "ENCUESTA",
                    text: "Comuniquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 404) {
                swal({
                    title: "ENCUESTA",
                    text: "Comuniquese con el soporte",
                    icon: "warning",
                    buttons: "Aceptar"
                });
            } else if (error.response.status === 401) {
                swal({
                    title: "ENCUESTA",
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
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '5rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo" ></img>
                                                        <b><h2 className="text-center mb-4">ENCUESTA DE SATISFACCION</h2></b>
                                                    </section>
                                                    <form >
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">ID</label>
                                                            <div className="col-sm-9">
                                                                <input type="number" className="form-control" pattern="000([0-9]{6})" name="Identifier" id='Identifier' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >MATERIA</label>

                                                            <select className="form-select tamañoinput" aria-label="Default select example" name='subjects' id='subjects' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opción</option>
                                                                {this.state.subjects.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.subject}</option>
                                                                )
                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >MOTIVO DE LA CONSULTA</label>

                                                            <select className="form-select tamañoinput" aria-label="Default select example" name='reasonConsultationId' id='reasonConsultationId' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opción</option>
                                                                {this.state.reasonConsultations.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >CALIFICACION</label>
                                                            <select className="form-select tamañoinput" aria-label="Default select example" name='athenaeumExperienceId' id='athenaeumExperienceId' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opción</option>
                                                                {this.state.athenaeumExperiences.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <label htmlFor="text" >SUGERENCIA</label>
                                                            <textarea type="text" className="form-control mb-4" onChange={this.handleChange} name="suggestion" id='suggestion' />
                                                        </div>


                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.PostPeticiones}>ENVIAR</button>
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

export default extractParameters(ES);
