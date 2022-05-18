import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import Principal from './Principal';
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

const baseURL = url.url + "/Poll/Id";

class EncuestaEstudiante extends Component {
    state = {
        encuestas: [],
        name_LastName: '',
        academicProgram: '',
        identifier: '',
        semester: '',
        subjects: [],
        questions: [],
        otro: [],
        respuesta0: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: '',
        respuesta5: '',
        respuesta6: '',
        respuesta7: '',
        respuesta8: '',
        respuesta9: '',
        respuesta10: '',
        respuesta11: '',
        respuesta12: '',
        respuesta13: '',
        respuesta14: '',
        respuesta15: '',
        respuesta16: '',
        respuesta17: '',
        respuesta18: '',
        respuesta19: '',
        respuesta20: '',
        respuesta21: '',
        respuesta22: '',
        respuesta23: '',
        respuesta24: '',
        status: false
    }
    componentDidMount = () => {
        this.getformularioid();
    }

    getformularioid() {
        const config = {
            headers: { 'pollId': this.state.encuestas, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        console.log(config)

        axios.get(baseURL, config).then(res => {
            this.setState({
                name_LastName: res.data.name_LastName,
                academicProgram: res.data.academicProgram,
                identifier: res.data.identifier,
                semester: res.data.semester,
                subjects: res.data.subjects,
                questions: res.data.questions,
                otro: res.data,
                respuesta0: res.data.questions[1].value,
                respuesta1: res.data.questions[0].value,
                respuesta2: res.data.questions[2].value,
                respuesta3: res.data.questions[3].value,
                respuesta4: res.data.questions[4].value,
                respuesta5: res.data.questions[5].value,
                respuesta6: res.data.questions[6].value,
                respuesta7: res.data.questions[7].value,
                respuesta8: res.data.questions[8].value,
                respuesta9: res.data.questions[9].value,
                respuesta10: res.data.questions[10].value,
                respuesta11: res.data.questions[11].value,
                respuesta12: res.data.questions[12].value,
                respuesta13: res.data.questions[13].value,
                respuesta14: res.data.questions[14].value,
                respuesta15: res.data.questions[15].value,
                respuesta16: res.data.questions[16].value,
                respuesta17: res.data.questions[17].value,
                respuesta18: res.data.questions[18].value,
                respuesta19: res.data.questions[19].value,
                respuesta20: res.data.questions[20].value,
                respuesta21: res.data.questions[21].value,
                respuesta22: res.data.questions[22].value,
                respuesta23: res.data.questions[23].value,
                respuesta24: res.data.questions[24].value,
                status: true
            })
            console.log(res.data.questions[0].value)
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        const cookie = new Cookies();
        this.state.encuestas = cookie.get('datos')

        const columns = [
            { title: 'id', field: 'id', hidden: 'false' },
            { title: 'Nombre y Apellido', field: 'name_LastName' },
            { title: 'ID', field: 'identifier' },
            { title: 'Carrera', field: 'academicProgram' },
            { title: 'Materia', field: 'subjects' },
            { title: 'Semestre', field: 'semester' },
            { title: 'Preguntas', field: 'Preguntas'},
            { title: 'Respuestas', field: 'Respuestas' },

        ]

        const data = [{
            name_LastName: this.state.name_LastName,
            identifier: this.state.identifier,
            academicProgram: this.state.academicProgram,
            subjects: this.state.subjects + "\n",
            semester: this.state.semester,
            Preguntas: "1" + '\n ,' + "2" + '\n ,' + "3" + '\n ,' + "4" + '\n ,' + "5" + '\n ,' + "6" + '\n ,' +"7" + '\n ,' + "8" + '\n ,' + "9" + '\n ,' + "10" + '\n ,' + "11" + '\n ,' + "12" + '\n ,' + "13" + '\n ,' + "14" + '\n ,' +"15" + '\n ,' + "16" + '\n ,' + "17" + '\n ,' + "18" + '\n ,' + "19" + '\n ,' + "20" + '\n ,' + "21" + '\n ,' + "22" + '\n ,' +"23" + '\n ,' + "24" + '\n ,' + "25",
            Respuestas: this.state.respuesta0 
            + '\n ,' + this.state.respuesta1
            + '\n ,' + this.state.respuesta2
            + '\n ,' + this.state.respuesta3
            + '\n ,' + this.state.respuesta4
            + '\n ,' + this.state.respuesta5
            + '\n ,' + this.state.respuesta6
            + '\n ,' + this.state.respuesta7
            + '\n ,' + this.state.respuesta8
            + '\n ,' + this.state.respuesta9
            + '\n ,' + this.state.respuesta10
            + '\n ,' + this.state.respuesta11
            + '\n ,' + this.state.respuesta12
            + '\n ,' + this.state.respuesta13
            + '\n ,' + this.state.respuesta14
            + '\n ,' + this.state.respuesta15
            + '\n ,' + this.state.respuesta16
            + '\n ,' + this.state.respuesta17
            + '\n ,' + this.state.respuesta18
            + '\n ,' + this.state.respuesta19
            + '\n ,' + this.state.respuesta20
            + '\n ,' + this.state.respuesta21
            + '\n ,' + this.state.respuesta22
            + '\n ,' + this.state.respuesta23
            + '\n ,' + this.state.respuesta24,


        }]



        return (

            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            {/* <div className='py-5 h-100'>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <div className=''>
                                        <div className='cardregistro' style={{ borderRadius: '1rem' }}>
                                            <div className=''>
                                                <div className='align-items-center'> */}
                            <div className=' p-4 p-lg-5 text-black'>
                                <section className="centrarelementos form">
                                    <img className="logo" src={logo} alt="logo"></img>
                                    <h2 className="text-center mb-4">ENCUESTA</h2>
                                </section>

                                <h3 className="text-center">Formulario Inicio Semestre</h3>

                                <div className="mb-4">

                                    <MaterialTable
                                        title={"Encuesta Estudiante"}
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

                                <form >
                                    {/* <h3 className="text-center">Formulario Inicio Semestre</h3>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre y Apellido</th>
                                                <th scope="col">ID</th>
                                                <th scope="col">Carrera</th>
                                                <th scope="col">Materia</th>
                                                <th scope="col">Semestre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.name_LastName}</td>
                                                <td>{this.state.identifier}</td>
                                                <td>{this.state.academicProgram}</td>
                                                <td>{this.state.subjects + " "}</td>
                                                <td>{this.state.semester}</td>
                                            </tr>
                                        </tbody>
                                    </table> */}

                                    <section className="centrarelementos mb-4">
                                        <h3>RESPUESTAS</h3>
                                    </section>


                                    {/* estatico */}
                                    {/* primera pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers' id='labelquestionsAnswers'>1 - Presaberes insuficientes.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta0}</label>
                                        </div>
                                    </div>


                                    {/* Segunda pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers2' id='labelquestionsAnswers2'>2 --  Inadecuados métodos de estudio.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta1}</label>
                                        </div>
                                    </div>
                                    {/* tercera pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers3' id='labelquestionsAnswers3'>3 -- Vacíos conceptuales de años anteriores..</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta2}</label>
                                        </div>
                                    </div>
                                    {/* cuarta pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers4' id='labelquestionsAnswers4'>4 -- Falta de motivación.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta3}</label>
                                        </div>
                                    </div>
                                    {/* quinta pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers5' id='labelquestionsAnswers5'>5 -- Dificultad en los nuevos temas de la asignatura.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta4}</label>
                                        </div>
                                    </div>
                                    {/* sexta pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers6' id='labelquestionsAnswers6'>6 -- Ausentismo (inasistencia frecuente) a clase.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta5}</label>
                                        </div>
                                    </div>
                                    {/* septima pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers7' id='labelquestionsAnswers7'>7 -- No toma apuntes en clase.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta6}</label>
                                        </div>
                                    </div>
                                    {/* octava pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers8' id='labelquestionsAnswers8'>8 -- No consulta el libro guía.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta7}</label>
                                        </div>
                                    </div>
                                    {/* novena pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers9' id='labelquestionsAnswers9'>9 -- Dificultades para concentrarse.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta8}</label>
                                        </div>
                                    </div>
                                    {/* decima pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers10' id='labelquestionsAnswers10'>10 -- Inadecuado aprovechamiento del  tiempo.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta9}</label>
                                        </div>
                                    </div>
                                    {/* once pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers11' id='labelquestionsAnswers11'>11 -- Se distrae muy fácilmente.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta10}</label>
                                        </div>
                                    </div>
                                    {/* doce pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers12' id='labelquestionsAnswers12'>12 -- Se distrae en clase con sus compañeros.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta11}</label>
                                        </div>
                                    </div>
                                    {/* trece pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers13' id='labelquestionsAnswers13'>13 -- Influencia negativa de compañeros o conocidos.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta12}</label>
                                        </div>
                                    </div>
                                    {/* catorce pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers14' id='labelquestionsAnswers14'>14 -- Consumo de alcohol u otras sustancias psicoactivas.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta13}</label>
                                        </div>
                                    </div>
                                    {/* quince pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers15' id='labelquestionsAnswers15'>15 -- Presión de otros para estudiar la carrara actual.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta14}</label>
                                        </div>
                                    </div>
                                    {/* diez y seis pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers16' id='labelquestionsAnswers16'>16 -- No ingresa a clase a pesar de estar en el campus.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta15}</label>
                                        </div>
                                    </div>
                                    {/* diez y siete pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers17' id='labelquestionsAnswers17'>17 --  Dificultades familiares.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta16}</label>
                                        </div>
                                    </div>
                                    {/* diezocho pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers18' id='labelquestionsAnswers18'>18 -- No le alcanza el tiempo Por compromisos laborales.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta17}</label>
                                        </div>
                                    </div>
                                    {/* diex y nueve pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers19' id='labelquestionsAnswers19'>19 -- No le entiende al docente.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta18}</label>
                                        </div>
                                    </div>
                                    {/* veinte pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers20' id='labelquestionsAnswers20'>20 -- Se distrae en clase con el celular.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta19}</label>
                                        </div>
                                    </div>
                                    {/* veinti una pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers21' id='labelquestionsAnswers21'>21 -- Sus padres no lo apoyan en la carrera que eligió.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta20}</label>
                                        </div>
                                    </div>
                                    {/* veinti dos pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers22' id='labelquestionsAnswers22'>22 -- No le gusta la carrera que eligió.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta21}</label>
                                        </div>
                                    </div>
                                    {/* veintetres pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers23' id='labelquestionsAnswers23'>23 -- Dificultades económicas.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta22}</label>
                                        </div>
                                    </div>
                                    {/* veinticuatro pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers24' id='labelquestionsAnswers24'>24 -- Siente cansancio, temor, estrés o ansiedad.</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta23}</label>
                                        </div>
                                    </div>
                                    {/* veinticico pregunta */}
                                    <div className="form-group row mb-4">
                                        <label htmlFor="text" className="col-sm-8 col-form-label" name='labelquestionsAnswers25' id='labelquestionsAnswers25'>25 -- No le alcanza el tiempo para contestar las evaluaciones, porque se pone nervioso, se bloquea(no recuerda algo).</label>
                                        <div className="col-sm-4 mb-4">
                                            <label htmlFor="text">Respuesta = {this.state.respuesta24}</label>
                                        </div>
                                    </div>

                                    <div className="mb-4 centrarelementos">
                                        <a className="link" href="/Encuestas"><button type="button" className="col-sm-4 btn btn-outline-dark form-label boton-color" >Aceptar</button></a>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            //                     </div>
            //                 </div >
            //             </div>
            //         </div>
            //     </div>
            // </div>

        );
    }
}

export default EncuestaEstudiante;