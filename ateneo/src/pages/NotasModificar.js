import React, { Component } from 'react';
import axios from 'axios';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo.png';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const baseURL = url.url + "/Qualification";
const baseURL1 = url.url + "/Qualification/List";
const baseURL2 = url.url + "/Qualification/Id";

class NotasModificar extends Component {
    state = {
        subjects: [],
        subject1: '',
        subject: '',
        firstCut: '',
        firstCutPercentage: '',
        firstPartial: '',
        firsPartialPercentage: '',
        secondCut: '',
        secondCutPercentage: '',
        secondPartial: '',
        secondPartialPercentage: '',
        laboratoryState: false,
        laboratoryValue: '',
        laboratoryPercentage: '',
        materiaseleccionada: '',
        id: '',
        subjectId: '',
        datonota: [],
        notas: [],
        qualification: [],
        status: false
    }

    componentDidMount = () => {
        this.getmaterias();
        this.getmateria();
        this.getidmateria();
    }

    getidmateria = async () => {
        const config = {
            headers: { 'idSubject': this.state.datonota, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config)

        await axios.get(baseURL2, config).then(res => {
            this.setState({
                qualification: res.data.qualification,
                subject1: res.data.qualification.subject,
                subjectId: res.data.qualification.subjectId,
                firstCut: res.data.qualification.firstCut,
                firstCutPercentage: res.data.qualification.firstCutPercentage,
                firstPartial: res.data.qualification.firstPartial,
                firsPartialPercentage: res.data.qualification.firsPartialPercentage,
                secondCut: res.data.qualification.secondCut,
                secondCutPercentage: res.data.qualification.secondCutPercentage,
                secondPartial: res.data.qualification.secondPartial,
                secondPartialPercentage: res.data.qualification.secondPartialPercentage,
                laboratoryState: res.data.qualification.laboratoryState,
                laboratoryValue: res.data.qualification.laboratoryValue,
                laboratoryPercentage: res.data.qualification.laboratoryPercentage,
                status: true
            })
            console.log(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    getmaterias() {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config).then(res => {
            this.setState({
                subjects: res.data.subjects,
                status: true
            })
            // console.log(res.data.subjects)
        }).catch((error) => {
            console.log(error);
        });
    }

    getmateria() {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL1, config).then(res => {
            this.setState({
                notas: res.data,
                status: true
            })
            // console.log(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event) => {

        this.setState({
            // materiaseleccionada: document.getElementById('materiahecha').value,
            laboratoryState: document.getElementById('laboratoryState').checked,
            subjectId: document.getElementById('materia').value,
            firstCut: document.getElementById('firstCut').value,
            firstCutPercentage: document.getElementById('firstCutPercentage').value,
            firstPartial: document.getElementById('firstPartial').value,
            firsPartialPercentage: document.getElementById('firsPartialPercentage').value,
            secondCut: document.getElementById('secondCut').value,
            secondCutPercentage: document.getElementById('secondCutPercentage').value,
            secondPartial: document.getElementById('secondPartial').value,
            secondPartialPercentage: document.getElementById('secondPartialPercentage').value,
            laboratoryValue: document.getElementById('laboratoryValue').value,
            laboratoryPercentage: document.getElementById('laboratoryPercentage').value
        })

    };

    mostrar() {
        if (document.getElementById('laboratoryState').checked) {
            document.getElementById('div-mostrar').style.display = "block";
        } else {
            document.getElementById('div-mostrar').style.display = "none";
        }
    }

    postnotas = () => {
        // event.preventDefault();
        const data = {
            "subject": this.state.subjectId,
            "firstCut": this.state.firstCut,
            "firstCutPercentage": this.state.firstCutPercentage,
            "firstPartial": this.state.firstPartial,
            "firsPartialPercentage": this.state.firsPartialPercentage,
            "secondCut": this.state.secondCut,
            "secondCutPercentage": this.state.secondCutPercentage,
            "secondPartial": this.state.secondPartial,
            "secondPartialPercentage": this.state.secondPartialPercentage,
            "laboratoryState": this.state.laboratoryState,
            "laboratoryValue": this.state.laboratoryValue,
            "laboratoryPercentage": this.state.laboratoryPercentage

        }
        // console.log(data)
        // console.log(this.state.laboratoryState)

        const config = {
            headers: { 'Content-Type': 'application/json', 'qualificationId': this.state.datonota, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        const p1 = parseFloat(this.state.firstCutPercentage)
        const p2 = parseFloat(this.state.firsPartialPercentage)
        const p3 = parseFloat(this.state.secondCutPercentage)
        const p4 = parseFloat(this.state.secondPartialPercentage)
        const p5 = parseFloat(this.state.laboratoryPercentage)

        var con = p1 + p2 + p3 + p4 + p5;
        var sin = p1 + p2 + p3 + p4;

        if (this.state.laboratoryState === true) {
            if (con === 100) {
                axios.put(baseURL, data, config)
                    .then(res => {
                        console.log(res.status);

                        if (res.status === 200) {

                            swal({
                                title: "Nota",
                                text: "Su registro fue exitoso",
                                icon: "success",
                                buttons: "Aceptar"
                            }).then(function () {
                                window.location = "/Notastable";
                            })
                        } if (res.status === 400) {
                            swal({
                                title: "Registro",
                                text: "Verifique los campos de su registro",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                        } else {

                        }

                    }).catch(function (error) {

                        if (error.response.status === 500) {
                            swal({
                                title: "Registro",
                                text: "Error en el servidor",
                                icon: "error",
                                buttons: "Aceptar"
                            })
                        } if (error.response.status === 400) {
                            swal({
                                title: "Registro",
                                text: "Verifique los campos de su registro",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                        } else {

                        }

                    })

            } else {
                swal({
                    title: "PORCENTAJE",
                    text: "Su porcentaje no es igual a 100%",
                    icon: "error",
                    buttons: "Aceptar"
                })

            }

        } else if (this.state.laboratoryState === false) {
            if (sin === 100) {
                axios.put(baseURL, data, config)
                    .then(res => {
                        console.log(res.status);

                        if (res.status === 200) {

                            swal({
                                title: "Nota",
                                text: "Su registro fue exitoso",
                                icon: "success",
                                buttons: "Aceptar"
                            }).then(function () {
                                window.location = "/Notastable";
                            })
                        } if (res.status === 400) {
                            swal({
                                title: "Registro",
                                text: "Verifique los campos de su registro",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                        } else {

                        }

                    }).catch(function (error) {

                        if (error.response.status === 500) {
                            swal({
                                title: "Registro",
                                text: "Error en el servidor",
                                icon: "error",
                                buttons: "Aceptar"
                            })
                        } if (error.response.status === 400) {
                            swal({
                                title: "Registro",
                                text: "Verifique los campos de su registro",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                        } else {

                        }

                    })

            } else {
                swal({
                    title: "PORCENTAJE",
                    text: "Su porcentaje no es igual a 100%",
                    icon: "error",
                    buttons: "Aceptar"
                })

            }
        }

    }

    valorlaboratoriovalue() {
        if (this.state.laboratoryValue == null) {
            this.state.laboratoryValue = 0
        } else {
            // this.state.laboratoryValue = this.state.laboratoryValue
        }
    }

    valorlaboratorioporce() {
        if (this.state.laboratoryPercentage == null) {
            this.state.laboratoryPercentage = 0
        } else {
            // this.state.laboratoryPercentage = this.state.laboratoryPercentage
        }
    }



    render() {
        const cooki = new Cookies();
        this.state.datonota = cooki.get('datonota')
        return (
            <div>
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
                                                            <img className="logo" src={logo} alt="logo"></img>
                                                            <h2 className="text-center mb-4">MODIFICAR NOTA</h2>
                                                        </section>
                                                        {/* <section className="centrarelementos">
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-2 col-form-label">MATERIA</label>
                                                                <div className="col-sm-10">
                                                                    <select className="form-select" aria-label="Default select example" name='materiahecha' id='materiahecha' onClick={this.getidmateria} onChange={this.handleChange} required>
                                                                        {this.state.notas.map(element => (
                                                                            <option key={element.id} value={element.id}>{element.subject}</option>
                                                                        ))}

                                                                    </select>
                                                                </div>
                                                                {/* <div className="mb-4 centrarelementos">
                                                                    <button type="button" className="btn btn-outline-danger form-label boton-color" onClick={this.getidmateria}>AGREGAR</button>
                                                                </div> 
                                                            </div>
                                                        </section> */}
                                                        <h3 className="text-center mb-4">NOTA</h3>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">MATERIA</label>
                                                            <div className="col-sm-9">
                                                                <select className="form-select" aria-label="Default select example" name='materia' id='materia' onChange={this.handleChange} required>

                                                                    <option value={this.state.subjectId} selected>{this.state.subject1}</option>

                                                                    {this.state.subjects.map(element => (
                                                                        <option key={element.id} value={element.id}>{element.subject}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <form >
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="number" className="col-sm-6 col-form-label">Primer Seguimiento</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Primer Seguimiento" name='firstCut' id='firstCut' defaultValue={this.state.firstCut} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Primer Seguimiento" name='firstCutPercentage' defaultValue={this.state.firstCutPercentage} id='firstCutPercentage' onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Primer Parcial</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Primer Parcial" name='firstPartial' id='firstPartial' defaultValue={this.state.firstPartial} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Primer Parcial" name='firsPartialPercentage' id='firsPartialPercentage' defaultValue={this.state.firsPartialPercentage} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Segundo Seguimiento</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Segundo Seguimiento" name='secondCut' id='secondCut' defaultValue={this.state.secondCut} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Segundo Seguimiento" name='secondCutPercentage' defaultValue={this.state.secondCutPercentage} id='secondCutPercentage' onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Segundo Parcial</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Segundo Parcial" name='secondPartial' id='secondPartial' defaultValue={this.state.secondPartial} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Segundo Parcial" name='secondPartialPercentage' id='secondPartialPercentage' defaultValue={this.state.secondPartialPercentage} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="laboratoryState" name='laboratoryState' checked={this.state.laboratoryState} onClick={this.mostrar} onChange={this.handleChange} />
                                                                <label className="form-check-label" htmlFor="laboratoryState">Tiene Laboratorio</label>
                                                            </div>

                                                            <div id='div-mostrar' style={{ display: 'none' }}>
                                                                <div className="form-group row mb-4">
                                                                    <label htmlFor="text" className="col-sm-6 scol-form-label" >Laboratorio</label>
                                                                    <div className="col-sm-6">
                                                                        <input type="number" className="form-control" placeholder="Nota Laboratorio" name='laboratoryValue' id='laboratoryValue' defaultValue={0} onChange={this.handleChange}></input>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row mb-4">
                                                                    <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                    <div className="col-sm-6">
                                                                        <input type="number" className="form-control" placeholder="Porcentaje Laboratorio" name='laboratoryPercentage' id='laboratoryPercentage' defaultValue={0} onChange={this.handleChange}></input>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="mb-4 centrarelementos">
                                                                <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.postnotas}>ACTUALIZAR</button>
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
            </div>
        );
    }
}

export default NotasModificar;