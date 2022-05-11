import React, { Component } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Principal from './Principal';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
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
import Cookies from 'universal-cookie';

const baseURL = url.url + "/Query/Id";
const baseURL1 = url.url + "/Query";

class AgendaConcejero extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
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
                        title: "CONSEJERIA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "CONSEJERIA",
                        text: "No tiene citas el dia de hoy",
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
                    queries: response.data.queries,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {
                // console.log(error.response.status);

                if (error.response.status === 500) {
                    swal({
                        title: "CONSEJERIA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "CONSEJERIA",
                        text: "No tiene citas el dia Seleccionado",
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

    editar(id, e) {
        e.preventDefault()
        console.log(id)
        this.state.pruebaid = id;
        const cooki = new Cookies();
        cooki.set('datosAgenda', id, { path: '/' });
        window.location.href = '/EditarAgenda';

    }


    deleteRow(id, e) {
        e.preventDefault()
        console.log(id)
        // do something with id
        const config = {
            headers: { 'queryId': id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        console.log(config)


        axios.delete(baseURL1, config).then(res => {
            console.log(res.status);
            if (res.status === 200) {

                swal({
                    title: "CITA",
                    text: "Su CITA se elimino con exitoso",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/AgendaConcejero";
                })
            } if (res.status === 400) {
                swal({
                    title: "CITA",
                    text: "Verifique la tabla",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }).catch(function (error) {
            // console.log(error.response.status);

            if (error.response.status === 500) {
                swal({
                    title: "CITA",
                    text: "Error en el servidor",
                    icon: "error",
                    buttons: "Aceptar"
                })
            } if (error.response.status === 400) {
                swal({
                    title: "CITA",
                    text: "Verifique los campos",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }

        })
    }

    render() {
        const nueva = format(this.state.time, "yyyy-MM-dd")
        // this.setState((state) => fechainicial= nueva) 
        this.state.fechainicial = nueva;
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
                                                            <h2 className="text-center mb-4">AGENDA CONSEJERO</h2>
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
                                                                <MDBRow className='row-cols-1 row-cols-md-3 g-4 mb-4' >
                                                                    <br></br>
                                                                    <MDBCol>
                                                                        <MDBCard className='h-100' style={{ width: '20rem' }} id={elem.id}>

                                                                            <MDBCardImage
                                                                                className="z-depth-1 rounded-circle img-perfil centrarelementos"
                                                                                src={elem.photo || "https://www.asofiduciarias.org.co/wp-content/uploads/2018/06/sin-foto.png"}
                                                                                alt='SIN ASIGNAR'
                                                                                position='top'
                                                                            />

                                                                            <MDBCardBody>
                                                                                <MDBCardTitle>CITA</MDBCardTitle>
                                                                                <MDBCardSubTitle><b>Nombre Estudiante =</b> {elem.nameLastName}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Fecha =</b> {elem.date}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Tiempo =</b> {elem.time}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>Lugar =</b> {elem.place}</MDBCardSubTitle>
                                                                                <MDBCardSubTitle><b>url =</b> <a href={elem.url}> link</a> </MDBCardSubTitle>
                                                                                <div className="form-group row">
                                                                                    <IconButton aria-label="Eliminar" sx={{ fontSize: 40 }} id={elem.id} onClick={(e) => this.editar(elem.id, e)}>
                                                                                        <EditIcon fontSize="inherit" sx={{ fontSize: 50,color: '#000'  }}/>
                                                                                    </IconButton>
                                                                                    {/* <button type="button" className="btn btn-outline-dark form-label boton-color col-sm-5" id={elem.id} onClick={(e) => this.deleteRow(elem.id, e)}>ELIMINAR</button> */}
                                                                                </div>
                                                                                <div className="form-group row">
                                                                                    <IconButton aria-label="Eliminar" sx={{ fontSize: 40 }} id={elem.id} onClick={(e) => this.deleteRow(elem.id, e)}>
                                                                                        <DeleteForeverIcon fontSize="inherit" sx={{ fontSize: 50,color: '#000'  }}/>
                                                                                    </IconButton>
                                                                                    {/* <button type="button" className="btn btn-outline-dark form-label boton-color" id={elem.id} onClick={(e) => this.editar(elem.id, e)}>EDITAR</button> */}
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

export default AgendaConcejero;