import React, { Component } from 'react';
import fondo from '../img/fondo-inicio.png';
import logo from '../img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../css/Login.css'
import '../css/Formulario.css'
import url from '../Conexions/conexion.js'
import Select from 'react-select';
import swal from 'sweetalert';

const baseURL = url.url + "/Form";

class Formulario extends Component {
    state = {
        form: [],
        subjectsList: [],
        semestersList: [],
        state: false,
        subjectsList1: '',
        semester: '',
        subjects: '',
        questionsAnswers: '',
        questionsAnswers2: '',
        questionsAnswers3: '',
        questionsAnswers4: '',
        questionsAnswers5: '',
        questionsAnswers6: '',
        questionsAnswers7: '',
        questionsAnswers8: '',
        questionsAnswers9: '',
        questionsAnswers10: '',
        questionsAnswers11: '',
        questionsAnswers12: '',
        questionsAnswers13: '',
        questionsAnswers14: '',
        questionsAnswers15: '',
        questionsAnswers16: '',
        questionsAnswers17: '',
        questionsAnswers18: '',
        questionsAnswers19: '',
        questionsAnswers20: '',
        questionsAnswers21: '',
        questionsAnswers22: '',
        questionsAnswers23: '',
        questionsAnswers24: '',
        questionsAnswers25: '',
        selectedOption1: null,
        selectedOption: null

    }
    cargarpreguntas = () => {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config2)
            .then(response => {
                this.setState({
                    form: response.data,
                    subjectsList: response.data.form.subjectsList,
                    semestersList: response.data.form.semestersList,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    PostFormulario = (event) => {
        event.preventDefault();
        const data = {
            'semester': this.state.semester,
            'subjects': this.state.selectedOption.map(elem => elem.value),
            'questions': [
                {
                    'id': 1,
                    'value': this.state.questionsAnswers
                },
                {
                    'id': 2,
                    'value': this.state.questionsAnswers2
                },
                {
                    'id': 3,
                    'value': this.state.questionsAnswers3
                },
                {
                    'id': 4,
                    'value': this.state.questionsAnswers4
                },
                {
                    'id': 5,
                    'value': this.state.questionsAnswers5
                },
                {
                    'id': 6,
                    'value': this.state.questionsAnswers6
                },
                {
                    'id': 7,
                    'value': this.state.questionsAnswers7
                },
                {
                    'id': 8,
                    'value': this.state.questionsAnswers8
                },
                {
                    'id': 9,
                    'value': this.state.questionsAnswers9
                },
                {
                    'id': 10,
                    'value': this.state.questionsAnswers10
                },
                {
                    'id': 11,
                    'value': this.state.questionsAnswers11
                },
                {
                    'id': 12,
                    'value': this.state.questionsAnswers12
                },
                {
                    'id': 13,
                    'value': this.state.questionsAnswers13
                },
                {
                    'id': 14,
                    'value': this.state.questionsAnswers14
                },
                {
                    'id': 15,
                    'value': this.state.questionsAnswers15
                },
                {
                    'id': 16,
                    'value': this.state.questionsAnswers16
                },
                {
                    'id': 17,
                    'value': this.state.questionsAnswers17
                },
                {
                    'id': 18,
                    'value': this.state.questionsAnswers18
                },
                {
                    'id': 19,
                    'value': this.state.questionsAnswers19
                },
                {
                    'id': 20,
                    'value': this.state.questionsAnswers20
                },
                {
                    'id': 21,
                    'value': this.state.questionsAnswers21
                },
                {
                    'id': 22,
                    'value': this.state.questionsAnswers22
                },
                {
                    'id': 23,
                    'value': this.state.questionsAnswers23
                },
                {
                    'id': 24,
                    'value': this.state.questionsAnswers24
                },
                {
                    'id': 25,
                    'value': this.state.questionsAnswers25
                }
            ]
        }

        console.log(data)

        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.post(baseURL, data, config)
            .then(res => {
                // console.log(res.status);
                // console.log(res.data);
                if (res.status === 200) {

                    swal({
                        title: "FORMULARIO",
                        text: "Su formulario fue Enviado",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "FORMULARIO",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }
            }).catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "FORMULARIO",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "FORMULARIO",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }
            })

    }

    componentDidMount() {
        this.cargarpreguntas();
    }

    ifdelllenado(paramid) {
        if (paramid <= 19) {
            return (
                <>
                    {/* <option selected>Seleccione una opcion</option> */}
                    <option key={1} value="1">1</option>
                    <option key={2} value="2">2</option>
                    <option key={3} value="3">3</option>
                    <option key={4} value="4">4</option>
                    <option key={5} value="5">5</option>
                    <option key={6} value="6">6</option>
                    <option key={7} value="7">7</option>
                    <option key={8} value="8">8</option>
                    <option key={9} value="9">9</option>
                    <option key={10} value="10">10</option>
                </>
            )
        } if (paramid > 19) {
            return (
                <>
                    {/* <option selected>Seleccione una opcion</option> */}
                    <option key={1} value="1">1</option>
                    <option key={2} value="2">2</option>
                    <option key={3} value="3">3</option>
                    <option key={4} value="4">4</option>
                    <option key={5} value="5">5</option>
                </>
            )
        } else {

        }
    };

    handleChange1 = selectedOption => {
        console.log(selectedOption)
        this.setState({
            selectedOption,
            subjects: selectedOption

        });
    };

    handleChange = (e) => {
        this.setState({
            semester: document.getElementById('semester').value,
            questionsAnswers: document.getElementById('questionsAnswers').value,
            questionsAnswers2: document.getElementById('questionsAnswers2').value,
            questionsAnswers3: document.getElementById('questionsAnswers3').value,
            questionsAnswers4: document.getElementById('questionsAnswers4').value,
            questionsAnswers5: document.getElementById('questionsAnswers5').value,
            questionsAnswers6: document.getElementById('questionsAnswers6').value,
            questionsAnswers7: document.getElementById('questionsAnswers7').value,
            questionsAnswers8: document.getElementById('questionsAnswers8').value,
            questionsAnswers9: document.getElementById('questionsAnswers9').value,
            questionsAnswers10: document.getElementById('questionsAnswers10').value,
            questionsAnswers11: document.getElementById('questionsAnswers11').value,
            questionsAnswers12: document.getElementById('questionsAnswers12').value,
            questionsAnswers13: document.getElementById('questionsAnswers13').value,
            questionsAnswers14: document.getElementById('questionsAnswers14').value,
            questionsAnswers15: document.getElementById('questionsAnswers15').value,
            questionsAnswers16: document.getElementById('questionsAnswers16').value,
            questionsAnswers17: document.getElementById('questionsAnswers17').value,
            questionsAnswers18: document.getElementById('questionsAnswers18').value,
            questionsAnswers19: document.getElementById('questionsAnswers19').value,
            questionsAnswers20: document.getElementById('questionsAnswers20').value,
            questionsAnswers21: document.getElementById('questionsAnswers21').value,
            questionsAnswers22: document.getElementById('questionsAnswers22').value,
            questionsAnswers23: document.getElementById('questionsAnswers23').value,
            questionsAnswers24: document.getElementById('questionsAnswers24').value,
            questionsAnswers25: document.getElementById('questionsAnswers25').value
        });
    };

    render() {

        const option =
            this.state.subjectsList.map(elem => (
                { key: elem.id, value: elem.id, label: elem.subject }
            ));

        return (
            <section className='vh-100 img-fluid' style={{ backgroundImage: `url(${fondo})`, backgroundSize: '100% 100%' }}>
                <div className='py-5 h-100'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className=''>
                            <div className='cardregistro' style={{ borderRadius: '1rem' }}>
                                <div className=''>
                                    <div className='align-items-center'>
                                        <div className=' p-4 p-lg-5 text-black'>
                                            <div className="centrarelementos form">
                                                <img className="logo" src={logo} alt="logo"></img>
                                            </div>
                                            <form >

                                                <h1 className="text-center mb-4">Formulario</h1>
                                                <div className="form-outline mb-4">
                                                    <p className='texto-justificado'>La siguiente encuesta tiene como objetivo conocer sus apreciaciones referentes a su desarrollo
                                                        académico en el presente semestre respecto a las asignaturas ofrecidas por el Departamento de
                                                        Ciencias Básicas. Es importante que señale sus necesidades para brindarle apoyo y acompañamiento
                                                        mediante las diferentes estrategias que ofrece la universidad y particularmente el Departamento de
                                                        Ciencias Básicas a través de su estrategia denominada ATENEO.</p>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado">1.Elija por favor de la siguiente lista, la asignatura que corresponde al docente que le ha compartido esta encuesta.</label>
                                                    <Select isMulti options={option} onChange={this.handleChange1} name='subjects' id='subjects' required></Select>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado">2.Elija por favor de la siguiente lista, el semestre que está cursando.</label>
                                                    <select className="form-select" aria-label="Default select example" name='semester' id='semester' onChange={this.handleChange} required>
                                                        <option selected>semestre</option>
                                                        {
                                                            this.state.semestersList.map(elem => (
                                                                // console.log(options)
                                                                <option key={elem.id} value={elem.id}>{elem.semester}</option>
                                                            ))
                                                        }

                                                    </select>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado">
                                                        3.A continuación, encontrará posibles causas que influyen en el bajo rendimiento académico. Por favor ordénelas de acuerdo a su caso, de la menor (1) a la de mayor (10) influencia.
                                                    </label>
                                                </div>

                                                {/* <div className="form-group row mb-4">
                                                    {
                                                        this.state.questionsList.map(elem => (
                                                            <>
                                                                <label htmlFor="text" className="col-sm-8 col-form-label" id={elem.id} name={elem.id} >{elem.id + " " + "--" + " " + elem.question}</label>
                                                                <div className="col-sm-4 mb-4">

                                                                    <select className="form-select" aria-label="Default select example" onChange={this.handleChange} name={elem.id} id={elem.id} >

                                                                        {this.ifdelllenado(elem.id)}

                                                                    </select>

                                                                </div>
                                                            </>
                                                        ))
                                                    }
                                                </div> */}

                                                {/* estatico */}
                                                {/* primera pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label" name='labelquestionsAnswers' id='labelquestionsAnswers'>1 -- Presaberes insuficientes.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers' id='questionsAnswers' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* Segunda pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers2' id='labelquestionsAnswers2'>2 -- Inadecuados métodos de estudio.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers2' id='questionsAnswers2' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* tercera pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers3' id='labelquestionsAnswers3'>3 -- Vacíos conceptuales de años anteriores..</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers3' id='questionsAnswers3' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* cuarta pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers4' id='labelquestionsAnswers4'>4 -- Pereza al estudiar.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers4' id='questionsAnswers4' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* quinta pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers5' id='labelquestionsAnswers5'>5 -- Dificultad en los nuevos temas de la asignatura.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers5' id='questionsAnswers5' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* sexta pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers6' id='labelquestionsAnswers6'>6 -- Ausentismo (inasistencia frecuente) a clase.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers6' id='questionsAnswers6' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* septima pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers7' id='labelquestionsAnswers7'>7 -- No toma apuntes en clase.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers7' id='questionsAnswers7' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* octava pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers8' id='labelquestionsAnswers8'>8 -- No consulta el libro guía.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers8' id='questionsAnswers8' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* novena pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers9' id='labelquestionsAnswers9'>9 -- Dificultades para concentrarse.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers9' id='questionsAnswers9' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* decima pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers10' id='labelquestionsAnswers10'>10 -- Inadecuado aprovechamiento del tiempo.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers10' id='questionsAnswers10' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* once pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers11' id='labelquestionsAnswers11'>11 -- Se distrae muy fácilmente.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers11' id='questionsAnswers11' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* doce pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers12' id='labelquestionsAnswers12'>12 -- Se distrae en clase con sus compañeros.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers12' id='questionsAnswers12' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* trece pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers13' id='labelquestionsAnswers13'>13 -- Influencia negativa de compañeros o conocidos.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers13' id='questionsAnswers13' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* catorce pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers14' id='labelquestionsAnswers14'>14 -- Consumo de alcohol u otras sustancias psicoactivas.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers14' id='questionsAnswers14' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* quince pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers15' id='labelquestionsAnswers15'>15 -- Presión de otros para estudiar la carrara actual.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers15' id='questionsAnswers15' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>
                                                </div>
                                                {/* diez y seis pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers16' id='labelquestionsAnswers16'>16 -- No ingresa a clase a pesar de estar en el campus.</label>
                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers16' id='questionsAnswers16' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* diez y siete pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers17' id='labelquestionsAnswers17'>17 -- Dificultades familiares.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers17' id='questionsAnswers17' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* diezocho pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers18' id='labelquestionsAnswers18'>18 -- No le alcanza el tiempo por compromisos laborales.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers18' id='questionsAnswers18' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                {/* diex y nueve pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers19' id='labelquestionsAnswers19'>19 -- No le entiende al docente.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers19' id='questionsAnswers19' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                        <option key={6} value="6">6</option>
                                                        <option key={7} value="7">7</option>
                                                        <option key={8} value="8">8</option>
                                                        <option key={9} value="9">9</option>
                                                        <option key={10} value="10">10</option>
                                                    </select>

                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado">
                                                        3.A continuación, encontrará posibles causas que influyen en el bajo rendimiento académico. Por favor ordénelas de acuerdo a su caso, de la menor (1) a la de mayor (5) influencia.
                                                    </label>
                                                </div>
                                                {/* veinte pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers20' id='labelquestionsAnswers20'>20 -- Se distrae en clase con el celular.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers20' id='questionsAnswers20' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>
                                                {/* veinti una pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers21' id='labelquestionsAnswers21'>21 -- Sus padres no lo apoyan en la carrera que eligió.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers21' id='questionsAnswers21' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>
                                                {/* veinti dos pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers22' id='labelquestionsAnswers22'>22 -- No le gusta la carrera que eligió.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers22' id='questionsAnswers22' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>
                                                {/* veintetres pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers23' id='labelquestionsAnswers23'>23 -- Dificultades económicas.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers23' id='questionsAnswers23' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>
                                                {/* veinticuatro pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers24' id='labelquestionsAnswers24'>24 -- Siente cansancio, temor, estrés o ansiedad.</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers24' id='questionsAnswers24' onChange={this.handleChange} required>
                                                        <option selected>Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>
                                                {/* veinticico pregunta */}
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label texto-justificado" name='labelquestionsAnswers25' id='labelquestionsAnswers25'>25 -- No le alcanza el tiempo para contestar las evaluaciones, porque se pone nervioso, se bloquea(no recuerda algo).</label>

                                                    <select className="form-select" aria-label="Default select example" name='questionsAnswers25' id='questionsAnswers25' onChange={this.handleChange} required>
                                                        <option >Seleccione una opción</option>
                                                        <option key={1} value="1">1</option>
                                                        <option key={2} value="2">2</option>
                                                        <option key={3} value="3">3</option>
                                                        <option key={4} value="4">4</option>
                                                        <option key={5} value="5">5</option>
                                                    </select>

                                                </div>

                                                <div className="mb-4 centrarelementos">
                                                    <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.PostFormulario}> ENVIAR</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        );
    }
}

export default Formulario;