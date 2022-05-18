import React, { Component } from 'react';
import axios from 'axios';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
import logo from '../img/logo.png';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


const baseURL = url.url + "/Profile/Email/Update";


class CorreoUpdate extends Component {
    state = {
        profile: [],
        id: '',
        email: '',
        identifier: '',
        status: false
    }

    handleChange = (event) => {

        this.setState({
            identifier: document.getElementById('Identifier').value,
            email: document.getElementById('Email').value,


        })
    };

    GetUser = () => {

        const config = {
            headers: { 'identifier': this.state.identifier, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    profile: response.data,
                    id: response.data.profile.id,
                    email: response.data.profile.email,
                    status: true

                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    PutEmail = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'profileId': this.state.id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config);


        const data = {
            "email": this.state.email
        }
        console.log(data);

        axios.put(baseURL, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "Email",
                        text: "Su Email se actualizo con éxito",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Correo";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "Email",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                if (error.response.status === 500) {
                    swal({
                        title: "Email",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Email",
                        text: "Verifique los campos",
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
                    <div id="layoutSidenav_content">
                        <Principal />
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '5rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h3 className="text-center mb-4">ACTUALIZACIÓN CORREO USUARIOS</h3>
                                                    </section>

                                                    <form className='centrarelementos'>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">ID INSTITUCIONAL</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control" pattern="000([0-9]{6})" name="Identifier" id='Identifier' onChange={this.handleChange} required />
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <IconButton aria-label="Buscar" onClick={this.GetUser} sx={{ fontSize: 30 }}>
                                                                    <SearchIcon fontSize="inherit" sx={{ fontSize: 30, color: '#000' }} />
                                                                </IconButton>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 centrarelementos col-form-label">Correo</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" defaultValue={this.state.email} pattern="000([0-9]{6})" name="Email" id='Email' onChange={this.handleChange} required />
                                                            </div>

                                                        </div>

                                                        <div className="col-sm-12">
                                                            <button type="button" className="boton-color col-sm-4 btn btn-outline-dark" onClick={this.PutEmail}>Actualizar</button>
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

export default CorreoUpdate;