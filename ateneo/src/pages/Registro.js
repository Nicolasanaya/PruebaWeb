import React, { Component } from 'react';
import axios from 'axios';
import '../css/Login.css'
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
import logo from '../img/logo.png';

const baseURL = url.url + "/Registry/User_Types";
const baseURL2 = url.url + "/Registry/Academic_program";
const baseURL3 = url.url + "/Registry/Document_Type";
const baseURL4 = url.url + "/Registry/create_user";

class Registro extends Component {
    state = {
        userTypesList: [],
        academicProgramsList: [],
        documentTypesList: [],
        UserType: '',
        Name: '',
        LastName: '',
        Identifier: '',
        Email: '',
        DocumentType: '',
        DocumentNumber: '',
        AcademicProgram: '',
        Password: '',
        Photo: null,
        TermAndConditions: true,
        status: false
    }


    // PostHorario = (event) => {
    //     // event.preventDefault();
    //     const config = {
    //         headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    //     }
    //     // console.log(config);

    //     const data = {
    //         "connectionDB": {
    //             "host": this.state.host,
    //             "dataBaseName": this.state.dataBaseName,
    //             "userName": this.state.userName,
    //             "password": this.state.password,
    //         },
    //         "connectionEmail": {
    //             "stmp": this.state.stmp,
    //             "port": this.state.port,
    //             "userName": this.state.userNameEmail,
    //             "password": this.state.passwordEmail,
    //         },
    //     }
    //     console.log(data);

    //     axios.post(baseURL, data, config)
    //         .then(res => {
    //             console.log(res.status);

    //             if (res.status === 200) {

    //                 swal({
    //                     title: "CREDENCIALES",
    //                     text: "Su credenciales fue Asignada",
    //                     icon: "success",
    //                     buttons: "Aceptar"
    //                 }).then(function () {
    //                     window.location = "/Credenciales";
    //                 })
    //             } if (res.status === 400) {
    //                 swal({
    //                     title: "CREDENCIALES",
    //                     text: "Verifique los campos",
    //                     icon: "warning",
    //                     buttons: "Aceptar"
    //                 })
    //             } else {

    //             }

    //         }).catch(res => {
    //             console.log(res.status);

    //             if (res.status === 500) {
    //                 swal({
    //                     title: "CREDENCIALES",
    //                     text: "Error en el servidor",
    //                     icon: "error",
    //                     buttons: "Aceptar"
    //                 })
    //             } if (res.status === 400) {
    //                 swal({
    //                     title: "CREDENCIALES",
    //                     text: "Verifique los campos",
    //                     icon: "warning",
    //                     buttons: "Aceptar"
    //                 })
    //             } else {

    //             }

    //         })

    // }

    comprobar(obj) {
        if (obj.checked)
            document.getElementById('boton').disabled = true;
        else
            document.getElementById('boton').disabled = false;
    }

    cargartiposdeusuario = () => {

        axios.get(baseURL)
            .then(response => {
                this.setState({
                    userTypesList: response.data.userTypesList,
                    status: true
                })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

    cargardocumentos = () => {
        axios.get(baseURL3)
            .then(response => {
                this.setState({
                    documentTypesList: response.data.documentTypesList,
                    status: true
                })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.cargartiposdeusuario();
        this.cargarprogramas();
        this.cargardocumentos();

    }

    handleChange = (event) => {

        this.setState({
            UserType: document.getElementById('UserType').value,
            Name: document.getElementById('Name').value,
            LastName: document.getElementById('LastName').value,
            Identifier: document.getElementById('Identifier').value,
            Email: document.getElementById('Email').value,
            DocumentType: document.getElementById('DocumentType').value,
            DocumentNumber: document.getElementById('DocumentNumber').value,
            AcademicProgram: document.getElementById('AcademicProgram').value,
            Password: document.getElementById('Password').value

        })
    };

    fileSelectedHandler = (event) => {
        let Photo = event.target.files[0];
        this.setState({ Photo: Photo });

    }

    fileUploadHandler = () => {
        // event.preventDefault();

        if (document.getElementById('Password').value === document.getElementById('Passwordconf').value) {
        } else {
            swal("Verifique que las contraseñas sean iguales")
        }

        const Photo = this.state.Photo;
        const formData = new FormData();
        formData.append('UserType', this.state.UserType);
        formData.append('Name', this.state.Name);
        formData.append('LastName', this.state.LastName);
        formData.append('Identifier', this.state.Identifier);
        formData.append('Email', this.state.Email);
        formData.append('DocumentType', this.state.DocumentType);
        formData.append('DocumentNumber', this.state.DocumentNumber);
        formData.append('AcademicProgram', this.state.AcademicProgram);
        formData.append('Password', this.state.Password);
        formData.append('Photo', Photo);
        formData.append('TermAndConditions', this.state.TermAndConditions);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(baseURL4, formData, config)
            .then(res => {
                console.log(res.status);
                if (res.status === 201) {

                    swal({
                        title: "Registro",
                        text: "Su registro fue exitoso",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/";
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
                console.log(error.response.status);
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

    }

    mostrar() {
        // if (document.getElementById('Password').value == document.getElementById('Password').value) {
        //     document.getElementById('div-mostrar').style.display = "block";            
        // }
        if (document.getElementById('UserType').value === 2) {
            document.getElementById('div-mostrar').style.display = "none";
        } else {
            document.getElementById('div-mostrar').style.display = "block";
        }
    }

    render() {
        return (

            <div className='py-5 h-100'>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className=''>
                        <div className='card' style={{ borderRadius: '5rem' }}>
                            <div className=''>
                                <div className='align-items-center'>
                                    <div className=' p-4 p-lg-5 text-black'>
                                        <div className="centrarelementos form">
                                            <img className="logo" src={logo} alt="logo"></img>
                                        </div>
                                        <form onSubmit={this.fileUploadHandler} encType="multipart/form">
                                            <b><h1 className="text-center">Registro</h1></b>

                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Tipo de usuario</label>
                                                <div className="col-sm-9">
                                                    <select className="form-select" aria-label="Default select example" name='UserType' id='UserType' onClick={this.mostrar} onChange={this.handleChange} required>
                                                        <option value="100">Seleccione una opcion</option>
                                                        {this.state.userTypesList.map(element => (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Nombres</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="Name" id='Name' onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Apellidos</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="LastName" id='LastName' onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">ID</label>
                                                <div className="col-sm-9">
                                                    <input type="number" className="form-control" pattern="000([0-9]{6})" name="Identifier" id='Identifier' onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Correo Institucional</label>
                                                <div className="col-sm-9">
                                                    <input type="email" className="form-control" required pattern="^\S+(@upb.edu.co)+$" name="Email" id='Email' onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Contraseña</label>
                                                <div className="col-sm-9">
                                                    <input type="password" className="form-control" name="Password" required id='Password' onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Confirmar contraseña</label>
                                                <div className="col-sm-9">
                                                    <input type="password" onChange={this.validarclave} className="form-control" name="Passwordconf" id='Passwordconf' required />
                                                </div>
                                            </div>
                                            {/* //ocultar */}
                                            <div id='div-mostrar'>
                                                <div className="form-group row mb-4">
                                                    <label htmlFor="text" className="col-sm-3 col-form-label">Tipo de documento</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select" aria-label="Default select example" name="DocumentType" id='DocumentType' onChange={this.handleChange}>
                                                            <option value="100">Seleccione una opcion</option>
                                                            {this.state.documentTypesList.map(element => (
                                                                <option key={element.id} value={element.id}>{element.name}</option>
                                                            )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-4">
                                                    <label htmlFor="text" className="col-sm-3 col-form-label">Numero de documento</label>
                                                    <div className="col-sm-9">
                                                        <input type="number" className="form-control" name="DocumentNumber" pattern="([0-9]{11})" id='DocumentNumber' onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-4">
                                                    <label htmlFor="text" className="col-sm-3 col-form-label">Programa Academico</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select" aria-label="Default select example" name="AcademicProgram" id='AcademicProgram' onChange={this.handleChange}>
                                                            <option value="100">Seleccione una opcion</option>
                                                            {this.state.academicProgramsList.map(element => (
                                                                <option key={element.id} value={element.id}>{element.name}</option>
                                                            )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* adjuntar archivo */}

                                            <div className="form-group row mb-4">
                                                <label htmlFor="text" className="col-sm-3 col-form-label">Adjuntar foto</label>
                                                <div className="col-sm-9">
                                                    <input type="file" id="Photo" multiple name="Photo" onChange={this.fileSelectedHandler} />
                                                </div>
                                            </div>

                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="TermAndConditions" name="TermAndConditions" onChange={this.handleChange} required />
                                                <label className="form-check-label" htmlFor="defaultCheck1" >
                                                    Aceptar <a href="url" >Terminos y Condiciones</a>
                                                </label>
                                            </div>

                                            <div className="mb-4 centrarelementos">
                                                <button type="button" id='boton' className="boton-color col-sm-4 btn btn-outline-dark" onClick={this.fileUploadHandler}> REGISTRAR</button>
                                            </div>

                                            {/* <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Tipo de usuario</label>
                                                <select className="form-select" aria-label="Default select example" name='UserType' id='UserType' onClick={this.mostrar} onChange={this.handleChange} required>
                                                    <option value="100">Seleccione una opcion</option>
                                                    {this.state.userTypesList.map(element => (
                                                        <option key={element.id} value={element.id}>{element.name}</option>
                                                    )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Nombres</label>
                                                <input type="text" className="form-control" pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="Name" id='Name' onChange={this.handleChange} required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Apellidos</label>
                                                <input type="text" className="form-control" pattern="^[a-zA-Zá-úÁ-ÚñÑ\s]+$" name="LastName" id='LastName' onChange={this.handleChange} required />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">ID</label>
                                                <input type="number" className="form-control" pattern="000([0-9]{6})" name="Identifier" id='Identifier' onChange={this.handleChange} required />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Correo Institucional</label>
                                                <input type="email" className="form-control" required pattern="^\S+(@upb.edu.co)+$" name="Email" id='Email' onChange={this.handleChange} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Contraseña</label>
                                                <input type="password" className="form-control" name="Password" required id='Password' onChange={this.handleChange} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Confirmar contraseña</label>
                                                <input type="password" onChange={this.validarclave} className="form-control" name="Passwordconf" id='Passwordconf' required />
                                            </div> */}
                                            {/* //ocultar */}
                                            {/* <div id='div-mostrar'>
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label">Tipo de documento</label>
                                                    <select className="form-select" aria-label="Default select example" name="DocumentType" id='DocumentType' onChange={this.handleChange}>
                                                        <option value="100">Seleccione una opcion</option>
                                                        {this.state.documentTypesList.map(element => (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label">Numero de documento</label>
                                                    <input type="number" className="form-control" name="DocumentNumber" pattern="([0-9]{11})" id='DocumentNumber' onChange={this.handleChange} />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label htmlFor="text" className="col-form-label">Programa Academico</label>
                                                    <select className="form-select" aria-label="Default select example" name="AcademicProgram" id='AcademicProgram' onChange={this.handleChange}>
                                                        <option value="100">Seleccione una opcion</option>
                                                        {this.state.academicProgramsList.map(element => (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        )
                                                        )}
                                                    </select>
                                                </div>
                                            </div> */}


                                            {/* adjuntar archivo */}

                                            {/* <div className="form-outline mb-4">
                                                <label htmlFor="text" className="col-form-label">Adjuntar archivo</label>
                                                <input type="file" className="form-control" id="Photo" multiple name="Photo" onChange={this.fileSelectedHandler} required/>
                                            </div>

                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="TermAndConditions" name="TermAndConditions" onChange={this.handleChange} required />
                                                <label className="form-check-label" htmlFor="defaultCheck1" >
                                                    Aceptar <a href="url" >Terminos y Condiciones</a>
                                                </label>
                                            </div>

                                            <div className="mb-4 centrarelementos">
                                                <button type="button" id='boton' className="boton-color col-sm-4 btn btn-outline-dark" onClick={this.fileUploadHandler}> REGISTRAR</button>
                                            </div> */}
                                        </form>
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

export default Registro;