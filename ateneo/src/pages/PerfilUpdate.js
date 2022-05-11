import React, { Component } from 'react';
import axios from 'axios';
import Principal from './Principal';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
import logo from '../img/logo.png';

const baseURL = url.url + "/Profile/Update";
const baseURL1 = url.url + "/Profile";
const baseURL2 = url.url + "/Registry/Academic_program";


class PerfilUpdate extends Component {
    state = {
        profile: [],
        academicProgramsList: [],
        name: '',
        photoOri: '',
        lastName: '',
        identifier: '',
        academicProgram: '',
        Password: '',
        academicProgramori: '',
        Photo: null,
        status: false
    }

    componentDidMount = () => {
        this.cargarprogramas();
        this.GetUser();

    }

    handleChange = (event) => {

        this.setState({
            name: document.getElementById('Name').value,
            lastName: document.getElementById('LastName').value,
            identifier: document.getElementById('Identifier').value,
            academicProgram: document.getElementById('AcademicProgram').value,
            Password: document.getElementById('Password').value
        })
    };

    cargarprogramas = () => {
        axios.get(baseURL2)
            .then(response => {
                this.setState({
                    academicProgramsList: response.data.academicProgramsList,
                    status: true
                })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fileSelectedHandler = (event) => {
        let Photo = event.target.files[0];
        this.setState({ Photo: Photo });
    }

    GetUser = () => {

        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    profile: response.data,
                    name: response.data.profile.name,
                    lastName: response.data.profile.lastName,
                    identifier: response.data.profile.identifier,
                    academicProgramori: response.data.profile.academicProgram,
                    photoOri: response.data.profile.photo,
                    status: true

                })
                if (response.data.profile.academicProgram === undefined) {
                    document.getElementById('div-mostrar').style.display = "none";
                } else {
                    document.getElementById('div-mostrar').style.display = "block";
                }
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fileUploadHandler = () => {
        // event.preventDefault();

        if (document.getElementById('Password').value === document.getElementById('Passwordconf').value) {
        } else {
            swal("Verifique que las contraseñas sean iguales")
        }
        const Photo = this.state.Photo;
        const formData = new FormData();
        formData.append('Name', this.state.name);
        formData.append('LastName', this.state.lastName);
        formData.append('Identifier', this.state.identifier);
        formData.append('AcademicProgram', this.state.academicProgram);
        formData.append('Password', this.state.Password);
        formData.append('Photo', Photo);

        console.log(formData)

        const config = {
            headers: { 'content-type': 'multipart/form-data', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.put(baseURL1, formData, config)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Su actualizacion fue exitoso",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Perfil";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Verifique los campos de su actualizacion",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                // console.log(res.status);
                if (error.response.status === 500) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "ACTUALIZACION",
                        text: "Verifique los campos de su actualizacion",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })
    }

    mostrar() {
        if (this.state.academicProgramori === "undefined") {
            document.getElementById('div-mostrar').style.display = "block";
        } else {
            document.getElementById('div-mostrar').style.display = "block";
        }
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
                                                        <img className="logo" src={logo} alt="logo" ></img>
                                                        <b><h2 className="text-center mb-4">PERFIL</h2></b>
                                                        <img className='img-perfil' src={this.state.photoOri} alt="perfil"></img>
                                                    </section>

                                                    <form onSubmit={this.fileUploadHandler} encType="multipart/form">                                            

                                                        <div className="form-group row mb-4">
                                                            <b><label htmlFor="text" className="col-sm-12 centrarelementos col-form-label">-------------------------------------------------------------------</label></b>

                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Nombres</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" defaultValue={this.state.name} pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="Name" id='Name' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Apellidos</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" defaultValue={this.state.lastName} pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="LastName" id='LastName' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">ID</label>
                                                            <div className="col-sm-9">
                                                                <input type="number" className="form-control" defaultValue={this.state.identifier} pattern="000([0-9]{6})" name="Identifier" id='Identifier' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Contraseña</label>
                                                            <div className="col-sm-9">
                                                                <input type="password" className="form-control" name="Password" id='Password' onChange={this.handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Confirmar contraseña</label>
                                                            <div className="col-sm-9">
                                                                <input type="password" onChange={this.validarclave} className="form-control" name="Passwordconf" id='Passwordconf' />
                                                            </div>
                                                        </div>
                                                        <div id='div-mostrar'>
                                                            <div className="form-group row mb-4">
                                                                <label htmlFor="text" className="col-sm-3 col-form-label">Programa Academico</label>
                                                                <div className="col-sm-9">
                                                                    <select className="form-select" aria-label="Default select example" name="AcademicProgram" id='AcademicProgram' onChange={this.handleChange}>
                                                                        <option value="100">{this.state.academicProgramori}</option>
                                                                        {this.state.academicProgramsList.map(element => (
                                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                                        )
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Adjuntar archivo</label>
                                                            <div className="col-sm-9">
                                                                <input type="file" id="Photo" multiple name="Photo" onChange={this.fileSelectedHandler} />
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.fileUploadHandler}>ACTUALIZAR</button>
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

export default PerfilUpdate;