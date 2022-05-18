import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Select from 'react-select';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import swal from 'sweetalert';



const baseURL = url.url + "/Schedule/Subjects";
const baseURL1 = url.url + "/Schedule/Teacher";
const baseURL2 = url.url + "/Schedule/Places";
const baseURL3 = url.url + "/Schedule";


class AsignarHorario extends Component {
    state = {
        subjects: [],
        teachers: [],
        places: [],
        time: new Date(),
        timefinal: new Date(),
        fechainicial: '',
        fechaFinal: '',
        docente: '',
        lugar: '',
        weekNumbers: '',
        virtualPlace: '',
        url: '',
        subjectss: '',
        selectedOption1: null,
        selectedOption: null
    }

    componentDidMount() {
        this.CargarMaterias();
        this.CargarDocentes();
        this.CargarLugar();

    }

    CargarMaterias = () => {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config2)
            .then(response => {
                this.setState({
                    subjects: response.data.subjects,
                    status: true
                })

            })
            .catch((error) => {
                console.log(error);
            });
    }

    CargarDocentes = () => {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL1, config2)
            .then(response => {
                this.setState({
                    teachers: response.data.teachers,
                    status: true
                })

            })
            .catch((error) => {
                console.log(error);
            });
    }

    CargarLugar = () => {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL2, config2)
            .then(response => {
                this.setState({
                    places: response.data.places,
                    status: true
                })

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

    handleChange1 = selectedOption => {
        console.log(selectedOption)
        this.setState({
            selectedOption,
            subjectss: selectedOption

        });
    };

    handleChangedemas = () => {
        this.setState({
            docente: document.getElementById('teachers').value,
            lugar: document.getElementById('places').value,
            virtualPlace: document.getElementById('virtualPlace').checked,
            url: document.getElementById('Urlname').value,
            weekNumbers: document.getElementById('weekNumbers').value
        })
    };

    PostHorario = (event) => {
        // event.preventDefault();
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config);

        const data = {
            "teacher": this.state.docente,
            "subjects": this.state.selectedOption.map(elem => elem.value),
            "place": this.state.lugar,
            "startDateTime": this.state.fechainicial,
            "endDateTime": this.state.fechaFinal,
            "weekNumbers": this.state.weekNumbers,
            "virtualPlace": this.state.virtualPlace,
            "url": this.state.url
        }
        console.log(data);

        axios.post(baseURL3, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "HORARIO",
                        text: "Su horario fue asignado",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/AsignarHorario";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "HORARIO",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                // console.log(res.status);

                if (error.response.status === 500) {
                    swal({
                        title: "HORARIO",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "HORARIO",
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

        const option =
            this.state.subjects.map(elem => (
                { key: elem.id, value: elem.id, label: elem.name }
            ));
        // const option1 =            
        //         [{ key: 111, value: 111, label: "ivan" },{ key: 222, value: 222, label: "melopela" }
        //         ]
        //     ;

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
                                                        <img className="logo" src={logo} alt="logo" ></img>
                                                        <h2 className="text-center mb-4">AGENDAMIENTO DOCENTE ATENEO</h2>
                                                    </section>
                                                    <form >
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Profesores</label>
                                                            <div className="col-sm-9">
                                                                <select className="form-select" aria-label="Default select example" name="teachers" id='teachers' onChange={this.handleChangedemas}>
                                                                    <option value="100">Seleccione una opción</option>
                                                                    {this.state.teachers.map(element => (
                                                                        <option key={element.t_Id} value={element.t_Id}>{element.t_Name}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Materias</label>
                                                            <div className="col-sm-9">
                                                                <Select isMulti options={option} onChange={this.handleChange1} name='subjects' id='subjects' required></Select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Lugar</label>
                                                            <div className="col-sm-9">
                                                                <select className="form-select" aria-label="Default select example" name="places" id='places' onChange={this.handleChangedemas}>
                                                                    <option value="100">Seleccione una opcion</option>
                                                                    {this.state.places.map(element => (
                                                                        <option key={element.id} value={element.id}>{element.name}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Fecha Inicial</label>
                                                            <div className="col-sm-9">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker format="yyyy-MM-dd hh:mm:ss" value={this.state.time} label="Fecha Inicial" name='time' id='time' onChange={this.handleChangeinicial} />
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Fecha Final</label>
                                                            <div className="col-sm-9">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DateTimePicker value={this.state.timefinal} format="yyyy-MM-dd hh:mm:ss" label="Fecha Final" name='timefinal' id='timefinal' onChange={this.handleChangefinal} />
                                                                </MuiPickersUtilsProvider>
                                                            </div>

                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">Semanas</label>
                                                            <div className="col-sm-3">
                                                                <input type="number" className="form-control" placeholder="Nota Primer Parcial" name='weekNumbers' id='weekNumbers' defaultValue={1} onChange={this.handleChangedemas}></input>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">¿Virtualidad?</label>
                                                            <div className="col-sm-9">
                                                                <div className="form-check form-switch ">
                                                                    <input className="form-check-input " type="checkbox" id="virtualPlace" name='virtualPlace' onChange={this.handleChangedemas} />
                                                                    <label className="form-check-label " htmlFor="laboratoryState">Virtual</label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-3 col-form-label">URL</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" className="form-control" name="Urlname" id='Urlname' onChange={this.handleChangedemas} />
                                                            </div>
                                                        </div>



                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="col-sm-4 btn btn-outline-dark boton-color" onClick={this.PostHorario}>CREAR</button>
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

export default AsignarHorario;