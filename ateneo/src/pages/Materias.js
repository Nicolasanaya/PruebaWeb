import React, { Component } from 'react';
import logo from '../img/logo.png';
import Principal from './Principal';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';

const baseURL = url.url + "/Subject";

class Materias extends Component {
    state = {
        subjects: [],
        id: '',
        NameMateria: '',
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            id: document.getElementById('Subject').value,
            NameMateria: document.getElementById('NameMateria').value

        })
    };

    putMaterias = () => {
        const data = {
            'name': this.state.NameMateria
        }
        console.log(data);
        const config = {
            headers: { 'Content-Type': 'application/json', 'subjectId': this.state.id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.put(baseURL, data, config).then(resp => {
            console.log(resp)
            if (resp.status === 200) {

                swal({
                    title: "Materia",
                    text: "Su actualizacion fue exitosa",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location.reload(true);
                })
            } if (resp.status === 400) {
                swal({
                    title: "Materia",
                    text: "No existe  la materia registrada o campo de nombre vacío",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }


        ).catch(function (error) {

            if (error.response.status === 500) {
                swal({
                    title: "Materia",
                    text: "Error en el servidor",
                    icon: "error",
                    buttons: "Aceptar"
                })
            } if (error.response.status === 400) {
                swal({
                    title: "Materia",
                    text: "Verifique los campos de su Materia",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }

        })
    }

    Materiasget = () => {
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
        this.Materiasget();
    }


    render() {
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <div id="layoutSidenav_content">
                        <Principal />
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '1rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                    </section>
                                                    <form className="form">
                                                        <h2 className="text-center mb-4">MATERIAS</h2>
                                                        <label htmlFor="text" className="mb-4">TIPO DE MATERIA</label>
                                                        <div className="col-sm-10 mb-4">
                                                            <select className="form-select" aria-label="Default select example" name='Subject' id='Subject' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opción</option>
                                                                {this.state.subjects.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <label htmlFor="text" className="mb-4">NOMBRE</label>

                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control mb-4" onChange={this.handleChange} name="NameMateria" id='NameMateria' />
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.putMaterias}>ACTUALIZAR</button>
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

export default Materias;