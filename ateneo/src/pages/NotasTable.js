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
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

// import { Modal, TextField, Button } from '@material-ui/core';

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

const baseURL = url.url + "/Qualification/List";
const baseURL1 = url.url + "/Qualification";

class NotasTable extends Component {
    state = {
        qualifications: [],
        subjects: [],
        subject: '',
        id: '',
        firstCut: '',
        firstCutPercentage: '',
        firstPartial: '',
        firsPartialPercentage: '',
        secondCut: '',
        secondCutPercentage: '',
        secondPartial: '',
        secondPartialPercentage: '',
        laboratoryState: false,
        laboratoryValue: '',
        laboratoryPercentage: '',
        qualificationId: '',
        averageSubject: '',
        finalNoteSubject: '',
        putlist: [],
        datonota: [],
        show: false,
        status: false
    }

    componentDidMount = () => {
        this.datostabla();
        this.getmaterias();
    }

    mostrar() {
        if (document.getElementById('laboratoryState').checked) {
            document.getElementById('div-mostrar').style.display = "block";
        } else {
            document.getElementById('div-mostrar').style.display = "none";
        }
    }

    datostabla() {

        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config).then(res => {
            this.setState({
                qualifications: res.data.qualifications,
                firstCut: res.data.qualifications.firstCut,
                firstCutPercentage: res.data.qualifications.firstCutPercentage,
                firstPartial: res.data.qualifications.firstPartial,
                firsPartialPercentage: res.data.qualifications.firsPartialPercentage,
                secondCut: res.data.qualifications.secondCut,
                secondCutPercentage: res.data.qualifications.secondCutPercentage,
                secondPartial: res.data.qualifications.secondPartial,
                secondPartialPercentage: res.data.qualifications.secondPartialPercentage,
                laboratoryState: res.data.qualifications.laboratoryState,
                laboratoryValue: res.data.qualifications.laboratoryValue,
                laboratoryPercentage: res.data.qualifications.laboratoryPercentage,
                averageSubject: res.data.qualifications.averageSubject,
                finalNoteSubject: res.data.qualifications.finalNoteSubject,
                status: true
            })
            // console.log(res.data.qualifications)
            // console.log(this.state.notas)
        }).catch((error) => {
            console.log(error);
        });


    }

    delete(rowData) {
        const config = {
            headers: { 'qualificationId': rowData.id, 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.delete(baseURL1, config).then(res => {
            console.log(res.status);
            if (res.status === 200) {

                swal({
                    title: "Nota",
                    text: "Su Nota se elimino con exitoso",
                    icon: "success",
                    buttons: "Aceptar"
                }).then(function () {
                    window.location = "/Notastable";
                })
            } if (res.status === 400) {
                swal({
                    title: "Nota",
                    text: "Verifique la tabla",
                    icon: "warning",
                    buttons: "Aceptar"
                })
            } else {

            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getmaterias() {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL1, config).then(res => {
            this.setState({
                subjects: res.data.subjects,
                status: true
            })
            // console.log(res.data.subjects)
        }).catch((error) => {
            console.log(error);
        });
    }

    datosPeticiones = (rowData) => {
        this.state.datonota = rowData
        const cooki = new Cookies();
        cooki.set('datonota', rowData.id, { path: '/' });
        window.location.href = '/NotasModificar';

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
            { title: 'Promedio', field: 'averageSubject' },
            { title: 'Nota final', field: 'finalNoteSubject' },]

        const data = this.state.qualifications.map(elem => (
            {
                id: elem.id, subject: elem.subject, firstCut: elem.firstCut, firstPartial: elem.firstPartial,
                secondCut: elem.secondCut, secondPartial: elem.secondPartial, laboratoryValue: elem.laboratoryValue,
                averageSubject: elem.averageSubject,
                finalNoteSubject: elem.finalNoteSubject
            }
        )
        )

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
                                                        <h2 className="text-center mb-4">NOTAS</h2>
                                                    </section>
                                                    <div className="mb-4" style={{ maxWidth: '100%' }}>

                                                        <MaterialTable
                                                            title={"Lista de notas"}
                                                            data={data}
                                                            columns={columns}
                                                            icons={tableIcons}
                                                            actions={[
                                                                {
                                                                    icon: Edit,
                                                                    tooltip: 'Editar notas',
                                                                    onClick: (event, rowData) => {
                                                                        this.datosPeticiones(rowData);
                                                                    }

                                                                },
                                                                {
                                                                    icon: DeleteOutline,
                                                                    tooltip: 'Eliminar notas',
                                                                    onClick: (event, rowData) => {
                                                                        swal({
                                                                            title: "Eliminar",
                                                                            text: "Seguro desea eliminar la nota",
                                                                            icon: "warning",
                                                                            buttons: ["NO", "SI"]
                                                                        }).then(res => {
                                                                            if (res) {
                                                                                this.delete(rowData)
                                                                            } else {
                                                                                window.location = "/notastable";
                                                                            }
                                                                        })

                                                                    }
                                                                }
                                                            ]}
                                                            options={{
                                                                // ..other options
                                                                exportButton: {
                                                                    csv: true,
                                                                    pdf: true
                                                                },
                                                                actionsColumnIndex: -1,
                                                                doubleHorizontalScroll: true,
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
                                                    <div className="mb-4 centrarelementos">
                                                        <a className="link" href="/Notas"><button type="button" className="btn btn-outline-dark form-label boton-color" >CREAR</button></a>
                                                        {/* <a className="link" href="/Notasmodificar"><button type="button" className="col-sm-4 btn btn-outline-danger form-label boton-color" >MODIFICAR</button></a> */}
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

export default NotasTable;