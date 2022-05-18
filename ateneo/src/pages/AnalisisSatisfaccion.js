import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import logo from '../img/logo.png';

const baseURL = url.url + "/AttendanceAnalysis";

class AnalisisSatisfaccion extends Component {
    state = {
        analysisSubjectList: [],
        status: false
    }

    GetanalysisSubjectList = () => {

        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    analysisSubjectList: response.data.analysisSubjectList,
                    status: true
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    componentDidMount = () => {
        this.GetanalysisSubjectList();
    }

    render() {

        const data2 = {
            labels: this.state.analysisSubjectList.map(elem => [elem.subject]),
            datasets: [{
                label: 'Materias',
                backgroundColor: '#FF0040',
                borderColor: 'black',
                borderWidth: 2,
                hoverBackgroundColor: '#B23EFF',
                hoverBorderColor: '#FF0000',
                data: this.state.analysisSubjectList.map(elem => [elem.number])
            }]
        };

        const options = {
            maintainAspectRatio: false,
            responsive: true
        }
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className=' p-4 text-black'>
                                <section className="centrarelementos form">
                                    <img className="logo" src={logo} alt="logo"></img>
                                    <h3 className="text-center mb-4">ANÁLISIS ASISTENCIA</h3>
                                </section>

                                <form className='centrarelementos'>

                                    <Bar data={data2} options={options}></Bar>
                                </form>
                            </div>
                        </div>



                    </div>

                </div>
            </div>

        );
    }
}

export default AnalisisSatisfaccion;