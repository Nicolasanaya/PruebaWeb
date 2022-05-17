import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../img/logo.png';
import MaterialTable from 'material-table';
import '@material-ui/icons';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const baseURL1 = url.url + "/QuestionAnswer/Answer/List";

class TablarespuestasEst extends Component {
    state = {
        answers: [],
        Verrespuesta: '',
        EditRespuesta: '',
        status: false
    }

    componentDidMount() {
        this.DatosPreguntas();
        // this.DatosPreguntasAuto();
    }

    DatosPreguntas = () => {
        const config = {
            headers: { 'questionId': this.state.Verrespuesta, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config)

        axios.get(baseURL1, config).then(res => {
            this.setState({
                answers: res.data.answers,
                status: true
            })
            // console.log(this.state.notas)
        }).catch((error) => {
            // console.log(error);
        });
    }

    render() {
        const columns = [
            { title: 'id', field: 'id', hidden: 'false' },
            { title: 'Introduccion', field: 'introduction' },
            { title: 'Respuesta', field: 'answer' }
        ]

        const data = this.state.answers.map(elem => (
            {
                id: elem.id, introduction: elem.introduction, answer: elem.answer
            }
        ))
        const cooki = new Cookies();
        this.state.Verrespuesta = cooki.get('Verrespuesta')
        return (
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
                                                <section className="centrarelementos form">
                                                    <img className="logo" src={logo} alt="logo"></img>
                                                    <h2 className="text-center mb-4">RESPUESTAS</h2>
                                                </section>
                                                <div className="mb-4">

                                                    <MaterialTable
                                                        title={"Respuestas"}
                                                        data={data}
                                                        columns={columns}
                                                        icons={tableIcons}                                                    
                                                        options={{
                                                            // ..other options
                                                            exportButton: {
                                                                csv: true,
                                                                pdf: true
                                                            },
                                                            actionsColumnIndex: -1
                                                        }}
                                                        localization={{
                                                            toolbar: {
                                                                exportCSVName: "Exportar csv",
                                                                exportPDFName: "Exportar pdf!!"
                                                            },
                                                            headers: {
                                                                actions: "Acciones"
                                                            }
                                                        }}
                                                    />
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
        </div >
        );
    }
}

export default TablarespuestasEst;