import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';



const baseURL = url.url + "/Charge/Id";
const baseURL1 = url.url + "/Charge";


class RolDocenteUpdate extends Component {
    state = {
        teacherInformation: [],
        photo: [],
        nameLastName: '',
        identifier: '',
        administrator: '',
        teacherAdvisor: '',
        teacher: '',
        datorolDoc: '',
        status: false

    }

    handleChange = (event) => {

        this.setState({
            administrator: document.getElementById('administrator').checked,
            teacherAdvisor: document.getElementById('teacherAdvisor').checked,
            teacher: document.getElementById('teacher').checked
        })

    };

    componentDidMount = () => {
        this.getRolid();
    }

    getRolid() {
        const config = {
            headers: { 'teacherId': this.state.datorolDoc, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config).then(res => {
            this.setState({
                teacherInformation: res.data,
                photo: res.data.teacherInformation.photo,
                identifier: res.data.teacherInformation.identifier,
                nameLastName: res.data.teacherInformation.nameLastName,
                administrator: res.data.teacherInformation.administrator,
                teacherAdvisor: res.data.teacherInformation.teacherAdvisor,
                teacher: res.data.teacherInformation.teacher,
                status: true
            })
            // console.log(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    putrolid = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'teacherId': this.state.datorolDoc, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config);


        const data = {
            "administrator": this.state.administrator,
            "teacherAdvisor": this.state.teacherAdvisor,
            "teacher": this.state.teacher,

        }
        console.log(data);

        axios.put(baseURL1, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "Rol",
                        text: "Su rol se actualizo con exito",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/RolDocente";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "Rol",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })
            .catch(function (error) {

                if (error.response.status === 500) {
                    swal({
                        title: "Rol",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Rol",
                        text: "Verifique los campos de su Rol",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }

    render() {
        const cooki = new Cookies();
        this.state.datorolDoc = cooki.get('datorolDoc')
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <div id="layoutSidenav_content">
                        <Principal />
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '3rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">ROL</h2>
                                                    </section>
                                                    <form className="form">
                                                        <img className='img-perfil' src={this.state.photo} alt="perfil"></img>
                                                        <label className="text-center mb-4">-----------------------------------------------------------</label>

                                                        {/* nombre */}
                                                        <label className="text-center mb-4">NOMBRE: {this.state.nameLastName}</label>
                                                        {/* id institucional*/}
                                                        <label className="text-center mb-4">ID: {this.state.identifier}</label>
                                                        {/* checkbox  administrator*/}
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="administrator" name='administrator' checked={this.state.administrator} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Administrador</label>
                                                        </div>

                                                        {/* checkbox teacherAdvisor */}
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="teacherAdvisor" name='teacherAdvisor' checked={this.state.teacherAdvisor} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Docente Concejero</label>
                                                        </div>

                                                          {/* checkbox teacherAdvisor */}
                                                          <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="teacher" name='teacher' checked={this.state.teacher} onChange={this.handleChange} />
                                                            <label className="form-check-label" htmlFor="laboratoryState">Docente</label>
                                                        </div>


                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.putrolid}>MODIFICAR</button>
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

export default RolDocenteUpdate;