import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../img/logo.png';
import swal from 'sweetalert';

const baseURL = url.url + "/QuestionAnswer/Create/Answer";
const baseURL1 = url.url + "/QuestionAnswer/Question/Id";

class Respuesta extends Component {
    state = {
        questions: [],
        subjects: [],
        respuesta: '',
        subjectname: '',
        questionname: '',
        subject: '',
        id: '',
        AnswerUrl: '',
        introduction: '',
        answername: '',
        Photo: null,
        show: false,
        status: false
    }

    Peticionesget = () => {
        const config = {
            headers: { 'questionId': this.state.respuesta, 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        // console.log(config)
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    question: response.data.question,
                    questionname: response.data.question.question,
                    subjectname: response.data.question.subject.name,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.Peticionesget();
        // this.DatosPreguntasAuto();
    }




    fileSelectedHandler = (event) => {
        let Photo = event.target.files[0];
        this.setState({ Photo: Photo });

    }

    handleChange = (event) => {

        this.setState({
            Introduction: document.getElementById('Introduction').value,
            AnswerUrl: document.getElementById('AnswerUrl').value,

        })
    };

    fileUploadHandler = () => {
        // event.preventDefault();

        const Photo = this.state.Photo;
        const formData = new FormData();
        formData.append('Introduction', this.state.Introduction);
        formData.append('AnswerUrl', this.state.AnswerUrl);
        formData.append('AnswerFile', Photo);

        const config = {
            headers: { 'content-type': 'multipart/form-data', 'questionId': this.state.respuesta, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.post(baseURL, formData, config)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {

                    swal({
                        title: "RESPUESTA",
                        text: "Su respuesta fue creada exitosomente",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/TablaPreguntas";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "RESPUESTA",
                        text: "Verifique los campos de su registro",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                console.log(error.response.status);
                if (error.response.status === 500) {
                    swal({
                        title: "RESPUESTA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "RESPUESTA",
                        text: "Verifique los campos de la respuestas",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }

    mostrar() {
        // if (document.getElementById('Password').value == document.getElementById('Password').value) {
        //     document.getElementById('div-mostrar').style.display = "block";            
        // }
        if (document.getElementById('checkurl').checked === true) {
            document.getElementById('div-mostraruno').style.display = "block";
        } if (document.getElementById('checkurl').checked === false) {            
            document.getElementById('div-mostraruno').style.display = "none";
        }
    }

    mostrardos() {

        if (document.getElementById('checkarchivo').checked === true) {
            document.getElementById('div-mostrardos').style.display = "block";
        } if (document.getElementById('checkarchivo').checked === false) {            
            document.getElementById('div-mostrardos').style.display = "none";
        }
    }



    render() {
        const cooki = new Cookies();
        this.state.respuesta = cooki.get('respuesta')
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
                                                        <b><h2 className="text-center mb-4">CARGAR RESPUESTA</h2></b>
                                                    </section>
                                                    <form className="form">
                                                        <div className="form-outline mb-2">
                                                            {/* nombre */}
                                                            <label className="text-center"> <b>Pregunta:</b> {this.state.questionname}</label>
                                                        </div>

                                                        <div className="form-outline mb-2">
                                                            {/* id institucional*/}
                                                            <label className="text-center "><b>Materia:</b> {this.state.subjectname}</label>
                                                        </div>
                                                    </form>

                                                    <form className="mb-4">

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-5 col-form-label">INTRODUCCION</label>
                                                            <div className="col-sm-7">
                                                                <input type="text" className="form-control" name="Introduction" id='Introduction' onChange={this.handleChange} />
                                                            </div>
                                                        </div>

                                                        {/* checkbox URL */}
                                                        <div className="form-check form-switch mb-4">
                                                            <input className="form-check-input" type="checkbox" id="checkurl" name='checkurl' onClick={this.mostrar} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Cargar URL</label>
                                                        </div>

                                                        {/* checkbox ARCHIVO */}
                                                        <div className="form-check form-switch mb-4">
                                                            <input className="form-check-input" type="checkbox" id="checkarchivo" name='checkarchivo' onClick={this.mostrardos} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Cargar Archivo </label>
                                                        </div>


                                                        <div id='div-mostraruno' style={{display : 'none'}}>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-4 col-form-label">URL</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" className="form-control" name="AnswerUrl" id='AnswerUrl' onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id='div-mostrardos' style={{display : 'none'}}>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-4 col-form-label">ADJUNTAR ARCHIVO</label>
                                                                <div className="col-sm-8">
                                                                    <input type="file" id="AnswerFile" multiple name="AnswerFile" onChange={this.fileSelectedHandler} />
                                                                </div>
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

export default Respuesta;