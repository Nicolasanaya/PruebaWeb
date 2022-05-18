import React, { Component } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Principal from './Principal';
import '../css/Perfilcss.css'
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import swal from 'sweetalert';

const baseURL1 = url.url + "/Schedule/Student-List/Id";
const baseURL2 = url.url + "/Schedule/Student-List";
const baseURL3 = url.url + "/Schedule/Student";


class AteneoTutorias extends Component {
    state = {
        schedules: [],
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
        axios.get(baseURL2, config)
            .then(response => {
                this.setState({
                    schedules: response.data.schedules,
                    photo: response.data.schedules.photo,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "TUTORÍA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "TUTORÍA",
                        text: "No tiene citas el día Seleccionado",
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
                    schedules: response.data.schedules,
                    photo: response.data.schedules.photo,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "TUTORÍA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "TUTORÍA",
                        text: "No tiene citas el día Seleccionado",
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
        axios.post(baseURL3, data, config).then(res => {
            console.log(res.status);
            if (res.status === 200) {

                swal({
                    title: "ATENEO",
                    text: "Su ATENEO tutoría se asigno con exitoso",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/AteneoTutorias";
                })
            } if (res.status === 400) {
                swal({
                    title: "ATENEO",
                    text: "Verifique la informacion",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }).catch(function (error) {
         
            if (error.statuscode === 401) {

                swal({
                    title: "ATENEO",
                    text: "NO TIENE AUTORIZACION",
                    icon: "success",
                    buttons: "Aceptar"
                })
            } if (error.status === 500) {
                swal({
                    title: "ATENEO",
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
                                                            <h2 className="text-center mb-4">ATENEO TUTORÍAS</h2>
                                                        </section>
                                                        <form className="form">
                                                            <div className="mb-4 centrarelementos">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DatePicker format="yyyy-MM-dd" value={this.state.time} label="Fecha Inicial" name='time' id='time' onChange={this.handleChangeinicial} />
                                                                </MuiPickersUtilsProvider>
                                                                <IconButton aria-label="Buscar" onClick={this.GetAgenda} sx={{ fontSize: 40 }}>
                                                                    <SearchIcon fontSize="inherit" sx={{ fontSize: 50, color: '#000' }} />
                                                                </IconButton>

                                                            </div>
                                                        </form>
                                                        <form className="form">
                                                            {this.state.schedules.map(elem => (


                                                                <MDBRow className='row-cols-1 row-cols-md-3 g-4' >
                                                                    <br></br>
                                                                    <MDBCol>
                                                                        <MDBCard className='h-100' style={{ width: '20rem' }} id={elem.id}>

                                                                            <MDBCardImage
                                                                                className="z-depth-1 rounded-circle img-perfil centrarelementos"
                                                                                src={elem.photo}
                                                                                alt='SIN ASIGNAR'
                                                                                position='top'
                                                                            />

                                                                            <MDBCardBody>
                                                                                <MDBCardTitle>CITA</MDBCardTitle>
                                                                                <MDBCardSubTitle><b>Nombre Docente =</b> {elem.nameLastName}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Materias =</b> {elem.subjects.map(e => (e.name + ", "))}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Fecha =</b> {elem.date}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Tiempo =</b> {elem.time}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Lugar =</b> {elem.place}</MDBCardSubTitle>
                                                                                <div className="form-group row">
                                                                                    <IconButton aria-label="Buscar" id={elem.id} onClick={(e) => this.PostEst(elem.id, e)} sx={{ fontSize: 40 }}>
                                                                                        <AssignmentTurnedInIcon fontSize="inherit" sx={{ fontSize: 50, color: '#000' }} />
                                                                                    </IconButton>
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

export default AteneoTutorias;