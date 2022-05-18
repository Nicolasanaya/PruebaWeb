import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import logo from '../img/logo.png';

const baseURL = url.url + "/TeacherAnalysis/List";
const baseURL1 = url.url + "/TeacherAnalysis";


class AnalisisDocente extends Component {
    state = {
        teacherList: [],
        teacherAnalysis: [],
        fullNameTeacher: '',
        athenaeumExperience: [],
        bad: '',
        regular: '',
        good: '',
        verySatisfactory: '',
        great: '',
        UserType: '',
        status: false
    }

    GetteacherList = () => {

        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    teacherList: response.data.teacherList,
                    status: true
                })
            })
            .catch((error) => {
            });
    }

    componentDidMount = () => {
        this.GetteacherList();
    }

    GetteacherAnalysis = () => {

        const config = {
            headers: { 'teacherId': this.state.UserType, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL1, config)
            .then(response => {
                this.setState({
                    teacherAnalysis: response.data.teacherAnalysis,
                    fullNameTeacher: response.data.teacherAnalysis.fullNameTeacher,
                    athenaeumExperience: response.data.teacherAnalysis.athenaeumExperience,
                    bad: response.data.teacherAnalysis.athenaeumExperience.bad,
                    regular: response.data.teacherAnalysis.athenaeumExperience.regular,
                    good: response.data.teacherAnalysis.athenaeumExperience.good,
                    verySatisfactory: response.data.teacherAnalysis.athenaeumExperience.verySatisfactory,
                    great: response.data.teacherAnalysis.athenaeumExperience.great,
                    status: true
                })
            })
            .catch((error) => {
            });
    }

    handleChange = (event) => {
        this.setState({
            UserType: document.getElementById('UserType').value,
        })
    };

    render() {
        const data2 = {
            labels: ['malo', 'normal', 'bueno', 'muy satisfactorio', 'genial'],
            datasets: [{
                backgroundColor: ['red', '#FE5500', '#FEC100', '#49FE00', '#04A104'],
                data: [this.state.bad, this.state.regular, this.state.good, this.state.verySatisfactory, this.state.great]
            }]
        };

        const options = {
            responsive: true
        }
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '3rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>

                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h3 className="text-center mb-4">ANÁLISIS SATISFACCIÓN DEL DOCENTE</h3>
                                                    </section>
                                                    <form className='centrarelementos'>
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-4 col-form-label">Docente</label>
                                                            <div className="col-sm-8">
                                                                <select className="form-select" aria-label="Default select example" name='UserType' id='UserType' onChange={this.handleChange} required>
                                                                    <option value="100">Seleccione una opción</option>
                                                                    {this.state.teacherList.map(element => (
                                                                        <option key={element.id} value={element.id}>{element.fullNameTeacher}</option>
                                                                    )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.GetteacherAnalysis}> ENVIAR</button>
                                                        </div>

                                                        <Pie data={data2} options={options} />
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

export default AnalisisDocente;