import React, { Component } from 'react';
import logo from '../img/logo.png';
import Principal from './Principal';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
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
import Cookies from 'universal-cookie';

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

const baseURL = url.url + "/QuestionAnswer/Subject";
const baseURL1 = url.url + "/QuestionAnswer/Question/List";

class TablaPreguntasEst extends Component {
    state = {
        questions: [],
        subjects: [],
        respuesta: '',
        Verrespuesta: '',
        EditPregunta: '',
        id: '',
        show: false,
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            id: document.getElementById('subjects').value,
        })
    };

    Peticionesget = () => {
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        axios.get(baseURL, config)
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

    componentDidMount() {
        this.Peticionesget();
        // this.DatosPreguntasAuto();
    }

    DatosPreguntas = () => {
        const config = {
            headers: { 'subjectId': document.getElementById('subjects').value, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        // console.log(config)

        axios.get(baseURL1, config).then(res => {
            this.setState({
                questions: res.data.questions,
                status: true
            })
            // console.log(this.state.notas)
        }).catch((error) => {
            // console.log(error);
        });


    }

    VerRespuestas = (rowData) => {
        this.state.Verrespuesta = rowData
        const cooki = new Cookies();
        cooki.set('Verrespuesta', rowData.id, { path: '/' });
        window.location.href = '/Tablarespuestas';
    }
    render() {

        const columns = [
            { title: 'id', field: 'id', hidden: 'false' },
            { title: 'Pregunta', field: 'question' }
        ]

        const data = this.state.questions.map(elem => (
            {
                id: elem.id, question: elem.question
            }
        ))
        return (
            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            {/* <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className=''>
                                <div className='card' style={{ borderRadius: '2rem' }}>
                                    <div className=''>
                                        <div className='align-items-center'> */}
                            <div className=' p-4 text-black'>
                                <section className="centrarelementos form">
                                    <img className="logo" src={logo} alt="logo"></img>
                                    <h2 className="text-center mb-4">PREGUNTAS MATERIA</h2>
                                </section>
                                <form >
                                    <div className="form-outline mb-4">
                                        <label htmlFor="text" >MATERIA</label>

                                        <select className="form-select tamañoinput" aria-label="Default select example" name='subjects' id='subjects' onChange={this.handleChange}>
                                            <option value="100">Seleccione una opcion</option>
                                            {this.state.subjects.map(element => (
                                                <option key={element.id} value={element.id} >{element.name}</option>
                                            )
                                            )}
                                        </select>
                                    </div>

                                    <div className="mb-4 centrarelementos">
                                        <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.DatosPreguntas}>BUSCAR</button>
                                    </div>
                                </form>
                                <div className="mb-4">

                                    <MaterialTable
                                        title={"Preguntas Frecuentes"}
                                        data={data}
                                        columns={columns}
                                        icons={tableIcons}
                                        actions={[
                                            {
                                                icon: Check,
                                                tooltip: 'Ver Respuestas',
                                                onClick: (event, rowData) => {
                                                    this.VerRespuestas(rowData)
                                                }
                                            }
                                        ]}
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
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div >
        );
    }
}

export default TablaPreguntasEst;