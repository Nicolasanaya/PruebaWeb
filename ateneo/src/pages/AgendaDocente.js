import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import QrCode2Icon from '@mui/icons-material/QrCode2';
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
import Cookies from 'universal-cookie';
import swal from 'sweetalert';


const baseURL = url.url + "/Schedule/Teacher-List/Id";
const baseURL1 = url.url + "/Schedule/Teacher-List";

class AgendaDocente extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            schedules: [],
            subjects: '',
            time: new Date(),
            lugar: '',
            fechainicial: '',
            pruebaid: '',
            fechaFinal: '',
            datosdocQR: '',
            url: '',
            photos: '',
            state: true
        }
    }

    componentDidMount = () => {
        this.GetAgendaAun();
    }

    GetAgendaAun = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        console.log(config)
        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    schedules: response.data.schedules,
                    subjects: response.data.schedules.subjects,
                    status: true
                })
                console.log(response.data.schedules);
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

            })
    }

    GetAgenda = () => {
        const config = {
            headers: { 'dateFilter': this.state.fechainicial, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    schedules: response.data.schedules,
                    subjects: response.data.schedules.subjects,
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

            })
    }

    handleChangeinicial = time => {
        this.setState({
            time: time
        })
    };

    QRGenerator = (id, e) => {
        e.preventDefault()
        this.state.datosdocQR = id
        const cooki = new Cookies();
        cooki.set('datosdocQR', id, { path: '/' });
        window.location.href = '/CrearQr';
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
                                                            <h2 className="text-center mb-4">AGENDA ATENEO</h2>
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


                                                                <MDBRow className='row-cols-1 row-cols-md-3 g-4 mb-4' id={elem.id} >
                                                                    <br></br>
                                                                    <MDBCol>
                                                                        <MDBCard className='h-100' style={{ width: '20rem' }} id={elem.id}>

                                                                            <MDBCardBody>
                                                                                <MDBCardTitle>HORARIO</MDBCardTitle>
                                                                                <MDBCardSubTitle><b>Materias =</b> {elem.subjects.map(e => (e.name + ","))}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Fecha =</b> {elem.date}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Tiempo =</b> {elem.time}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Lugar =</b> {elem.place}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Número de estudiantes =</b> {elem.studentsNumber}</MDBCardSubTitle>
                                                                                <div className="form-group row">
                                                                                    <IconButton aria-label="QR" id={elem.id} onClick={(e) => this.QRGenerator(elem.id, e)} sx={{ fontSize: 40 }}>
                                                                                        <QrCode2Icon sx={{ fontSize: 60, color: '#000' }} />
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

export default AgendaDocente;