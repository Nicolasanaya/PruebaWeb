import React, { Component } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Principal from './Principal';
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

const baseURL1 = url.url + "/StudentNotebook/Id";
const baseURL2 = url.url + "/StudentNotebook";
const baseURL3 = url.url + "/Schedule/Student";

class AgendaEstudiante extends Component {
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

    deleteRow(id, e) {
        e.preventDefault()
        console.log(id)
        // do something with id
        const config = {
            headers: { 'scheduleId': id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        console.log(config)


        axios.delete(baseURL3, config).then(res => {
            console.log(res.status);
            if (res.status === 200) {

                swal({
                    title: "TUTORÍA",
                    text: "Su TUTORÍA se eliminó con exitoso",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/AgendaEstudiante";
                })
            } if (res.status === 400) {
                swal({
                    title: "TUTORÍA",
                    text: "Verifique la tabla",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
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
        }
        )
    }

    render() {
        const nueva = format(this.state.time, "yyyy-MM-dd")
        this.state.fechainicial = nueva
        return (
            <div >
                <div className='sb-nav-fixed'>
                    <div className='row g-0'>
                        <Principal />
                        <div id="layoutSidenav_content">
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
                                                                                <MDBCardTitle>{elem.queryType}</MDBCardTitle>
                                                                                <MDBCardSubTitle><b>Nombre Docente =</b> {elem.teacherFullName}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Materias =</b> {elem.subjects.map(e => (e.name + ","))}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Fecha =</b> {elem.date}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Tiempo =</b> {elem.time}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Lugar =</b> {elem.place}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>url =</b> <a target="_blank" href={elem.url}> link</a> </MDBCardSubTitle>
                                                                                <div className="form-group row">
                                                                                    <IconButton aria-label="Eliminar" sx={{ fontSize: 40 }} id={elem.id} onClick={(e) => this.deleteRow(elem.id, e)}>
                                                                                        <DeleteForeverIcon fontSize="inherit" sx={{ fontSize: 50, color: '#000' }} />
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

export default AgendaEstudiante;