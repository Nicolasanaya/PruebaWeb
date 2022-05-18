import React, { Component } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Principal from './Principal';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import swal from 'sweetalert';

const baseURL = url.url + "/Query/Student/Query/List";
const baseURL1 = url.url + "/Query/Student/Query/List/Id";
const baseURL2 = url.url + "/Query/Student";

class Tutorias extends Component {

    state = {
        queries: [],
        time: new Date(),
        lugar: '',
        fechainicial: '',
        pruebaid: '',
        fechaFinal: '',
        url: '',
        photos: '',
        state: true

    }

    componentDidMount = () => {
        this.GetAgendaAun();
    }

    GetAgendaAun = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config)
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    queries: response.data.queries,
                    photo: response.data.queries.photo,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "TUTORIA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "TUTORIA",
                        text: "No tiene citas el dia Seleccionado",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }
            });
    }

    GetAgenda = () => {
        const config = {
            headers: { 'dateFilter': this.state.fechainicial, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    queries: response.data.queries,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "TUTORIA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "TUTORIA",
                        text: "No tiene citas el dia Seleccionado",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }
            });
    }

    handleChangeinicial = time => {
        this.setState({
            time: time
        })
    };

    PostEst(id, e) {
        e.preventDefault()
        // console.log(id)
        // do something with id
        const config = {
            headers: { 'queryId': id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        const data = {
        }
        axios.post(baseURL2,data, config).then(res => {
            console.log(res.status);
            if (res.status === 200) {

                swal({
                    title: "TUTORÍA",
                    text: "Su TUTORÍA se asigno con exitoso",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/AgendaConcejero";
                })
            } if (res.status === 400) {
                swal({
                    title: "TUTORÍA",
                    text: "Verifique la información",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }).catch(function (error) {

            if (error.response.status === 401) {

                swal({
                    title: "TUTORÍA",
                    text: "NO TIENE AUTORIZACION",
                    icon: "success",
                    buttons: "Aceptar"
                })
            } if (error.response.status === 500) {
                swal({
                    title: "TUTORÍA",
                    text: "Error del sevidor",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        });
    }

    render() {
        const nueva = format(this.state.time, "yyyy-MM-dd")
        this.state.fechainicial = nueva
        return (
            <div >
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <div id="layoutSidenav_content">
                        <Principal />
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '2rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos">
                                                        <h2 className="text-center mb-4">AGENDA</h2>
                                                    </section>
                                                    <form className="form">
                                                        <div className="mb-4 centrarelementos">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DatePicker format="yyyy-MM-dd" value={this.state.time} label="Fecha Inicial" name='time' id='time' onChange={this.handleChangeinicial} />
                                                            </MuiPickersUtilsProvider>

                                                            <IconButton aria-label="Buscar" onClick={this.GetAgenda} sx={{ fontSize: 40 }}>
                                                                    <SearchIcon fontSize="inherit" sx={{ fontSize: 50,color: '#000'  }}/>
                                                                </IconButton>

                                                        </div>
                                                    </form>
                                                    <form className="form">
                                                        {this.state.queries.map(elem => (

                                                            <MDBRow className='row-cols-1 row-cols-md-3 g-4' >
                                                                <br></br>
                                                                <MDBCol>
                                                                    <MDBCard className='h-100' style={{ width: '20rem' }} id={elem.id}>

                                                                        <MDBCardImage
                                                                            className='img-perfil centrarelementos'
                                                                            src={elem.photo}
                                                                            alt='SIN ASIGNAR'
                                                                            position='top'
                                                                        />

                                                                        <MDBCardBody>
                                                                            <MDBCardTitle>CITA</MDBCardTitle>
                                                                            <MDBCardSubTitle>Nombre Estudiante = {elem.nameLastName}</MDBCardSubTitle>
                                                                            <MDBCardSubTitle>Fecha = {elem.date}</MDBCardSubTitle>
                                                                            <MDBCardSubTitle>Tiempo = {elem.time}</MDBCardSubTitle>
                                                                            <MDBCardSubTitle>Lugar = {elem.place}</MDBCardSubTitle>
                                                                            <MDBCardSubTitle>url = <a href={elem.url}> link</a> </MDBCardSubTitle>
                                                                            <div className="form-group row">
                                                                                <button type="button" className="btn btn-outline-danger form-label boton-color col-sm-5" id={elem.id} onClick={(e) => this.PostEst(elem.id, e)}>ASIGNAR</button>
                                                                                {/* <div className="col-sm-6">
                                                                                    <button type="button" className="btn btn-outline-danger form-label boton-color" id={elem.id} onClick={(e) => this.editar(elem.id, e)}>EDITAR</button>
                                                                                </div> */}
                                                                            </div>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </MDBCol>
                                                                <br></br>

                                                            </MDBRow>

                                                        ))}

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

export default Tutorias;