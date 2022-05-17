import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/Qualification/Student/List";

class NotasEstudiantes extends Component {
    state = {
        qualification: [],
        qualifications: [],
        nameLastName: '',
        identifier: '',
        studentId: '',
        show: false,
        status: false
    }

    handleChange = (event) => {
        this.setState({
            studentId: document.getElementById('studentId').value
        })
    };

    getNotasEst = () => {
        const config = {
            headers: { 'studentId': this.state.studentId, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        console.log(config)

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    qualification: response.data,
                    qualifications: response.data.qualification.qualifications,
                    nameLastName: response.data.qualification.nameLastName,
                    identifier: response.data.qualification.identifier,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {

                if (error.response.status === 404) {
                    swal({
                        title: "Notas",
                        text: "El estudiante no existe",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                }if (error.response.status === 500) {
                    swal({
                        title: "Notas",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Notas",
                        text: "El estudiante no tiene notas",
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
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">NOTAS ESTUDIANTES</h2>
                                                    </section>
                                                    <form className="form">
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-6 col-form-label">ID Estudiante</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control" pattern="000([0-9]{6})" name="studentId" id='studentId' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.getNotasEst}>BUSCAR</button>
                                                        </div>

                                                        {/* nombre */}
                                                        <label className="text-center mb-4"><b>Nombre:</b> {this.state.nameLastName}</label>
                                                        {/* id institucional*/}
                                                        <label className="text-center mb-4"><b>ID:</b> {this.state.identifier}</label>



                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Materia</th>
                                                                    <th scope="col">Primer Seguimiento</th>
                                                                    <th scope="col">Primer Parcial</th>
                                                                    <th scope="col">Segundo Seguimiento</th>
                                                                    <th scope="col">Segundo Parcial</th>.
                                                                    <th scope="col">Laboratorio</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.qualifications.map(elem => (
                                                                    <tr>
                                                                        <td>{elem.subject}</td>
                                                                        <td>{elem.firstCut}</td>
                                                                        <td>{elem.firstPartial}</td>
                                                                        <td>{elem.secondCut}</td>
                                                                        <td>{elem.secondPartial}</td>
                                                                        <td>{elem.laboratoryValue}</td>
                                                                    </tr>
                                                                ))
                                                                }
                                                            </tbody>
                                                        </table>




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

export default NotasEstudiantes;