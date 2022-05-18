import React, { Component } from 'react';
import axios from 'axios';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo.png';
import swal from 'sweetalert';

const baseURL = url.url + "/Qualification";

class Notas extends Component {
    state = {
        subjects: [],
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
        status: false
    }

    componentDidMount = () => {
        this.getmaterias();
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
            console.log(res.data.subjects)
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event) => {

        this.setState({
            laboratoryState: document.getElementById('laboratoryState').checked,
            subject: document.getElementById('materia').value,
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
            "subject": this.state.subject,
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
        console.log(data)
        console.log(this.state.laboratoryState)

        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
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
                axios.post(baseURL, data, config)
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
                axios.post(baseURL, data, config)
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



    render() {
        return (
            <div>
                <div className='sb-nav-fixed'>
                    <div className='row g-0'>
                        <Principal />
                        <div id="layoutSidenav_content">
                            <div className='margen-top h-100'>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <div className=''>
                                        <div className='cardperfil' style={{ borderRadius: '5rem' }}>
                                            <div className=''>
                                                <div className='align-items-center'>
                                                    <div className=' p-4 text-black'>
                                                        <section className="centrarelementos form">
                                                            <img className="logo" src={logo} alt="logo"></img>
                                                            <h2 className="text-center mb-4">PERFIL</h2>
                                                        </section>
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-2 col-form-label">MATERIA</label>
                                                            <div className="col-sm-10">
                                                                <select className="form-select" aria-label="Default select example" name='materia' id='materia' onChange={this.handleChange} required>
                                                                    <option value="100">Seleccione una opción</option>
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
                                                                    <input type="number" className="form-control" placeholder="Nota Primer Seguimiento" name='firstCut' id='firstCut' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Primer Seguimiento" name='firstCutPercentage' defaultValue={0} id='firstCutPercentage' onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Primer Parcial</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Primer Parcial" name='firstPartial' id='firstPartial' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Primer Parcial" name='firsPartialPercentage' id='firsPartialPercentage' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Segundo Seguimiento</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Segundo Seguimiento" name='secondCut' id='secondCut' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Segundo Seguimiento" name='secondCutPercentage' defaultValue={0} id='secondCutPercentage' onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Segundo Parcial</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Nota Segundo Parcial" name='secondPartial' id='secondPartial' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-6 col-form-label">Porcentaje</label>
                                                                <div className="col-sm-6">
                                                                    <input type="number" className="form-control" placeholder="Porcentaje Segundo Parcial" name='secondPartialPercentage' id='secondPartialPercentage' defaultValue={0} onChange={this.handleChange}></input>
                                                                </div>
                                                            </div>

                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" type="checkbox" id="laboratoryState" name='laboratoryState' value={1} onClick={this.mostrar} onChange={this.handleChange} />
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
                                                                <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.postnotas}>AGREGAR</button>
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

export default Notas;