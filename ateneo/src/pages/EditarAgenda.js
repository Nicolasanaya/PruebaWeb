import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

const baseURL = url.url + "/Query/Update";
const baseURL1 = url.url + "/Query";
const baseURL2 = url.url + "/Place";

class EditarAgenda extends Component {
    state = {
        places: [],
        time: new Date(),
        timefinal: new Date(),
        lugar: '',
        fechainicial: '',
        fechaFinal: '',
        virtualPlace: '',
        placeId: '',
        place: '',
        endDateTime: '',
        datorolDoc: '',
        startDateTime: '',
        url: '',
        state: true
    }

    componentDidMount = () => {
        this.GetLugar();
        this.GetDatos();
    }

    GetLugar = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL2, config)
            .then(response => {
                this.setState({
                    places: response.data.places,
                    status: true
                })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    GetDatos = () => {
        const cooki = new Cookies();
        const datosAgenda = cooki.get('datosAgenda')
        this.datorolDoc = datosAgenda


        const config = {
            headers: { 'queryId': datosAgenda, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    query: response.data.query,
                    startDateTime: response.data.query.startDateTime,
                    endDateTime: response.data.query.endDateTime,
                    place: response.data.query.place,
                    placeId: response.data.query.placeId,
                    virtualPlace: response.data.query.virtualPlace,
                    url: response.data.query.url,
                    status: true
                })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangeinicial = time => {
        this.setState({
            time: time
        })
    };

    handleChangefinal = timefinal => {
        this.setState({
            timefinal: timefinal
        })
    };

    handleChangedemas = () => {
        this.setState({
            lugar: document.getElementById('places').value,
            virtualPlace: document.getElementById('virtualPlace').checked,
            url: document.getElementById('Urlname').value
        })
    };

    PutCitas = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'queryId': this.state.datorolDoc, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config);


        const data = {
            "place": this.state.lugar,
            "startDateTime": this.state.fechainicial,
            "endDateTime": this.state.fechaFinal,
            "virtualPlace": this.state.virtualPlace,
            "url": this.state.url
        }
        console.log(data);

        axios.put(baseURL1, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "CONSEJERÍA",
                        text: "Su CONSEJERÍA fue Actualizada",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/AgendaConcejero";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "CONSEJERÍA",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {

                if (error.response.status === 500) {
                    swal({
                        title: "CONSEJERÍA",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "CONSEJERÍA",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }


    render() {
        const nueva = format(this.state.time, "yyyy-MM-dd'T'hh:mm:ss")
        this.state.fechainicial = nueva
        // console.log(nueva)
        const nueva1 = format(this.state.timefinal, "yyyy-MM-dd'T'hh:mm:ss")
        this.state.fechaFinal = nueva1
        // console.log(nueva1)
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '5rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">EDITAR AGENDAMIENTO CONSEJERO</h2>
                                                    </section>
                                                    <form >

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">Lugar</label>
                                                            <div className="col-sm-8">
                                                                <select className="form-select" aria-label="Default select example" name="places" id='places' onChange={this.handleChangedemas}>
                                                                    <option value={this.state.placeId}>{this.state.place}</option>
                                                                    {this.state.places.map(element => (
                                                                        <option key={element.id} value={element.id}>{element.name}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">Fecha Inicial</label>
                                                            <div className="col-sm-8">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker format="yyyy-MM-dd hh:mm:ss" value={this.state.time} label={"Fecha Inicial" + this.state.startDateTime} name='time' id='time' onChange={this.handleChangeinicial} />
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">Fecha Final</label>
                                                            <div className="col-sm-8">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker value={this.state.timefinal} format="yyyy-MM-dd hh:mm:ss" label={"Fecha Final" + this.state.endDateTime} name='timefinal' id='timefinal' onChange={this.handleChangefinal} />
                                                                </MuiPickersUtilsProvider>
                                                            </div>

                                                        </div>

                                                        {/* checkbox */}
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">¿Virtualidad?</label>
                                                            <div className="col-sm-8">
                                                                <div className="form-check form-switch ">
                                                                    <input className="form-check-input " checked={this.state.virtualPlace} type="checkbox" id="virtualPlace" name='virtualPlace' onChange={this.handleChangedemas} />
                                                                    <label className="form-check-label " htmlFor="laboratoryState">Virual</label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-2 col-form-label">URL</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" defaultValue={this.state.url} name="Urlname" id='Urlname' onChange={this.handleChangedemas} />
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark boton-color" onClick={this.PutCitas}>CREAR</button>
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

export default EditarAgenda;