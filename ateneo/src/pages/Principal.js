import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../css/Principalcss.css'
import logo from '../img/logoUpbBlanco.png';
import axios from 'axios';
import url from '../Conexions/conexion.js'

const baseURL = url.url + "/Login";
const baseURL2 = url.url + "/Profile/Photo";

class Principal extends Component {
    state = {
        userType: '',
        photo: '',
        array: '',
        status: false
    }

    getfoto() {

        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL2, config2).then(res => {
            this.setState({
                photo: res.data.photo,
                status: true
            })
            // console.log(res.data.photo)       
        }).catch((error) => {
            // console.log(error);
        });


    }

    getlogin = () => {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config2).then(res => {
            this.setState({
                userType: res.data.userType,
                status: true

            })
            // console.log(res.data)
        })
    }

    cargarmenulateral() {
        const titulos =
            <span>
                <img src={this.state.photo || "https://cdn.w600.comps.canstockphoto.com/grunge-textured-admin-stamp-seal-eps-vector_csp63873446.jpg"} alt="perfil" className='tamaño-perfil'></img>
            </span>
            ;

        if (this.state.userType === "DCA") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )
        } else if (this.state.userType === "DC") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "CA") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "DA") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )
        } else if (this.state.userType === "U") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "A") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "D") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "C") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else if (this.state.userType === "E") {
            return (
                <NavDropdown title={titulos} >
                    <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/Pqr">PQRS</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">MUE</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.cerrarsesion}>SALIR</NavDropdown.Item>
                </NavDropdown>
            )

        } else {

        }

    }

    cargarmenu() {

        if (this.state.userType === "DCA") {
            return (
                <Nav>
                    <Nav.Link href="/NotasEstudiantes">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDAMIENTO" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Citas">Consejero</NavDropdown.Item>
                        <NavDropdown.Item href="/AsignarHorario">Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaConcejero">Agenda Consejero</NavDropdown.Item>
                        <NavDropdown.Item href="/AgendaDocente">Agenda Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="VALIDACION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/ValidarDocente">Validar Docentes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolesEstudiantes">Validar Estudiantes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolDocente">Roles Docentes</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="ACTUALIZACION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Materias">MATERIAS</NavDropdown.Item>
                        <NavDropdown.Item href="/CorreoUpdate">CORREO</NavDropdown.Item>
                        <NavDropdown.Item href="/Lugar">LUGAR</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Peticiones">PETICIONES</Nav.Link>
                    <NavDropdown title="ENCUESTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/encuestas">Encuesta Estudiante</NavDropdown.Item>
                        <NavDropdown.Item href="/EncuestaSatisfaccion">Encuesta Satisfaccion</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="ANALISIS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AnalisisDocente">Analisis Docente</NavDropdown.Item>
                        <NavDropdown.Item href="/AnalisisSatisfaccion">Analisis Satisfaccion</NavDropdown.Item>
                    </NavDropdown>
                    
                    <NavDropdown title="PREGUNTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Preguntas">Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/TablaPreguntas">Tabla Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/PreguntasEst">Preguntas Estudiantes</NavDropdown.Item>
                    </NavDropdown>


                </Nav>
            )
        } else if (this.state.userType === "DC") {
            return (
                <Nav>
                    <Nav.Link href="/Notas">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDAMIENTO" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Citas">Consejero</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaConcejero">Agenda Consejero</NavDropdown.Item>
                        <NavDropdown.Item href="/AgendaDocente">Agenda Ateneo</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )

        } else if (this.state.userType === "CA") {
            return (
                <Nav>
                    <Nav.Link href="/Notas">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDAMIENTO" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Citas">Consejero</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaConcejero">Agenda Consejero</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="VALIDACION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/ValidarDocente">Validar Docentes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolesEstudiantes">Validar Estudiantes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolDocente">Roles Docentes</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Materias">MATERIAS</Nav.Link>
                    <Nav.Link href="/Peticiones">PETICIONES</Nav.Link>
                    <Nav.Link href="/CorreoUpdate">CORREO</Nav.Link>
                    <NavDropdown title="ENCUESTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/encuestas">Encuesta Estudiante</NavDropdown.Item>
                        <NavDropdown.Item href="/EncuestaSatisfaccion">Encuesta Satisfaccion</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Lugar">LUGAR</Nav.Link>
                    <NavDropdown title="PREGUNTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Preguntas">Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/TablaPreguntas">Tabla Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/PreguntasEst">Preguntas Estudiantes</NavDropdown.Item>
                    </NavDropdown>


                </Nav>
            )

        } else if (this.state.userType === "DA") {
            return (
                <Nav>
                    <Nav.Link href="/Notas">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDAMIENTO" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AsignarHorario">Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaDocente">Agenda Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="VALIDACION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/ValidarDocente">Validar Docentes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolesEstudiantes">Validar Estudiantes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolDocente">Roles Docentes</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Materias">MATERIAS</Nav.Link>
                    <Nav.Link href="/Peticiones">PETICIONES</Nav.Link>
                    <Nav.Link href="/CorreoUpdate">CORREO</Nav.Link>
                    <NavDropdown title="ENCUESTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/encuestas">Encuesta Estudiante</NavDropdown.Item>
                        <NavDropdown.Item href="/EncuestaSatisfaccion">Encuesta Satisfaccion</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Lugar">LUGAR</Nav.Link>
                    <NavDropdown title="PREGUNTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Preguntas">Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/TablaPreguntas">Tabla Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/PreguntasEst">Preguntas Estudiantes</NavDropdown.Item>
                    </NavDropdown>


                </Nav>
            )
        } else if (this.state.userType === "U") {
            return (
                <Nav>
                    <Nav.Link href="/PeticionesAdmin">PETICIONES</Nav.Link>
                    <Nav.Link href="/Roles">ROLES</Nav.Link>
                    <Nav.Link href="/Credenciales">CREDENCIALES</Nav.Link>
                    <Nav.Link href="/Media">MEDIA</Nav.Link>
                    <Nav.Link href="/ActualizarFiles">ACTUALIZACION</Nav.Link>
                </Nav>
            )

        } else if (this.state.userType === "A") {
            return (
                <Nav>
                    <NavDropdown title="AGENDAMIENTO" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Citas">Consejero</NavDropdown.Item>
                        <NavDropdown.Item href="/AsignarHorario">Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="VALIDACION" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/ValidarDocente">Validar Docentes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolesEstudiantes">Validar Estudiantes</NavDropdown.Item>
                        <NavDropdown.Item href="/RolDocente">Roles Docentes</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Materias">MATERIAS</Nav.Link>
                    <Nav.Link href="/Peticiones">PETICIONES</Nav.Link>
                    <Nav.Link href="/CorreoUpdate">CORREO</Nav.Link>
                    <NavDropdown title="ENCUESTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/encuestas">Encuesta Estudiante</NavDropdown.Item>
                        <NavDropdown.Item href="/EncuestaSatisfaccion">Encuesta Satisfaccion</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Lugar">LUGAR</Nav.Link>
                    <NavDropdown title="Preguntas" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Preguntas">Preguntas</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            )

        } else if (this.state.userType === "D") {
            return (
                <Nav>
                    <Nav.Link href="/Notas">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaDocente">Agenda Ateneo</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )

        } else if (this.state.userType === "C") {
            return (
                <Nav>
                    <Nav.Link href="/Notas">NOTAS</Nav.Link>
                    <NavDropdown title="AGENDA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/AgendaConcejero">Agenda Consejero</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )

        } else if (this.state.userType === "E") {
            return (
                <Nav>
                    <Nav.Link href="/Notastable">NOTAS</Nav.Link>
                    <Nav.Link href="/AgendaEstudiante">AGENDA</Nav.Link>
                    <NavDropdown title="TUTORIAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Tutorias">Tutorias Consejeros</NavDropdown.Item>
                        <NavDropdown.Item href="/AteneoTutorias">Tutorias Ateneo</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="PREGUNTAS Y RESPUESTAS" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Generarpregunta">Generar Preguntas</NavDropdown.Item>
                        <NavDropdown.Item href="/TablaPreguntasEst">Ver Preguntas Frecuentes</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )

        } else {

        }

    }

    componentDidMount() {
        this.getlogin();
        this.getfoto();
    }

    cerrarsesion = () => {
        localStorage.removeItem("token");
        window.location = ("/")
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect fixed='top' className="color-nav" expand="sm" variant="dark">
                    <Container >
                        <Navbar.Brand href="/Principal"><img src={logo} alt="logo"></img></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                {this.cargarmenu()}
                            </Nav>

                            <Nav className="ms-auto">
                                {this.cargarmenulateral()}                              
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
            </div>
        );
    }
}

export default Principal;