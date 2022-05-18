import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';
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

const baseURL = url.url + "/Qualification/Student/List";

class NotasEstudiantes extends Component {
    state = {
        qualification: [],
        qualifications: [],
        nameLastName: '',
        identifier: '',
        studentId: '',
        show: false,
        status: false
    }

    handleChange = (event) => {
        this.setState({
            studentId: document.getElementById('studentId').value
        })
    };

    getNotasEst = () => {
        const config = {
            headers: { 'studentId': this.state.studentId, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        console.log(config)

        axios.get(baseURL, config)
            .then(response => {
                this.setState({
                    qualification: response.data,
                    qualifications: response.data.qualification.qualifications,
                    nameLastName: response.data.qualification.nameLastName,
                    identifier: response.data.qualification.identifier,
                    status: true
                })
                //console.log(response);
            })
            .catch(function (error) {

                if (error.response.status === 404) {
                    swal({
                        title: "Notas",
                        text: "El estudiante no existe",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 500) {
                    swal({
                        title: "Notas",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "Notas",
                        text: "El estudiante no tiene notas",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            })

    }

    render() {
        const columns = [
            { title: 'id', field: 'id', hidden: 'false' },
            { title: 'Materia', field: 'subject' },
            { title: 'Primer Seguimiento', field: 'firstCut' },
            { title: 'Primer Parcial', field: 'firstPartial' },
            { title: 'Segundo Seguimiento', field: 'secondCut' },
            { title: 'Segundo Parcial', field: 'secondPartial' },
            { title: 'Laboratorio', field: 'laboratoryValue' },
        ]

        const data = this.state.qualifications.map(elem => (
            {
                subject: elem.subject, 
                firstCut: elem.firstCut, 
                firstPartial: elem.firstPartial, 
                secondCut: elem.secondCut, 
                secondPartial: elem.secondPartial, 
                laboratoryValue: elem.laboratoryValue
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
                                    <div className='card' style={{ borderRadius: '1rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'> */}
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h2 className="text-center mb-4">NOTAS ESTUDIANTES</h2>
                                                    </section>
                                                    <form className="form">
                                                        <div className="form-group row mb-4">
                                                            <label htmlFor="text" className="col-sm-6 col-form-label">ID Estudiante</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" className="form-control" pattern="000([0-9]{6})" name="studentId" id='studentId' onChange={this.handleChange} required />
                                                            </div>
                                                        </div>
                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className="btn btn-outline-dark form-label boton-color" onClick={this.getNotasEst}>BUSCAR</button>
                                                        </div>

                                                        {/* nombre */}
                                                        <label className="text-center mb-4"><b>Nombre:</b> {this.state.nameLastName}</label>
                                                        {/* id institucional*/}
                                                        <label className="text-center mb-4"><b>ID:</b> {this.state.identifier}</label>
                                                        </form>

                                                        <div className="mb-4">

                                                            <MaterialTable
                                                                title={"Notas Estudiantes"}
                                                                
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
            //                 </div>
            //             </div>

            //         </div>

            //     </div>
            // </div>
        );
    }
}

export default NotasEstudiantes;