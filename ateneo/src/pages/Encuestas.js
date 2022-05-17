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
const baseURL = url.url + "/Poll";

class Encuestas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dato: [],
            polls: [],
            show: false,
            status: true
        }
    }

    ResetearPost = () => {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }
        const data = {

        }

        swal({
            title: "Resetear",
            text: "¿Seguro desea Resetear las encuestas?",
            icon: "warning",
            buttons: ["NO", "SI"]
        }).then(res => {
            if (res) {
                axios.post(baseURL, data, config).then(
                    res => {
                        if (res.status === 200) {

                            swal({
                                title: "Resetear",
                                text: "Las encuestas se resetearon exitosamente",
                                icon: "success",
                                buttons: "Aceptar"
                            }).then(function () {
                                window.location = "/Encuestas";
                            })
                        } if (res.status === 400) {
                            swal({
                                title: "Resetear",
                                text: "Verifique los campos",
                                icon: "warning",
                                buttons: "Aceptar"
                            })
                        } else {
        
                        }
        
                    }
                )
                .catch(function (error) {
                    if (error.response.status === 500) {
                        swal({
                            title: "Resetear",
                            text: "Error en el servidor",
                            icon: "error",
                            buttons: "Aceptar"
                        })
                    }if (error.response.status === 401) {
                        swal({
                            title: "Resetear",
                            text: "No tiene autorizacion",
                            icon: "error",
                            buttons: "Aceptar"
                        })
                    } if (error.response.status === 400) {
                        swal({
                            title: "Resetear",
                            text: "Verifique los campos",
                            icon: "warning",
                            buttons: "Aceptar"
                        })
                    } else {
    
                    }
    
                })
            } else {
                window.location = "/Encuestas";
            }
        })

    }

    getEncuestas() {
        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config).then(res => {
            this.setState({
                polls: res.data.polls,
                status: true
            })
            // console.log(res.data.subjects)
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.getEncuestas();
    }

    datos = (rowData) => {
        this.state.dato = rowData
        const cookie = new Cookies();
        cookie.set('datos', rowData.id, { path: '/' });
        window.location.href = '/encuestaestudiante';

    }

    render() {
        const columns = [
            { title: 'id', field: 'id', hidden: 'false' },
            { title: 'Nombres', field: 'name' },
            { title: 'Apellidos', field: 'lastName' },
            { title: 'Programa Academico', field: 'academicProgram' },
            { title: 'Tipo de Encuesta', field: 'pollType' }]

        const data = this.state.polls.map(elem => (
            {
                id: elem.id, name: elem.name, lastName: elem.lastName, academicProgram: elem.academicProgram,
                pollType: elem.pollType
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
                                                        <img className="logo" src={logo} alt="logo" ></img>
                                                        <h2 className="text-center mb-4">ENCUESTAS</h2>
                                                    </section>

                                                    <div className="mb-4">
                                                        <MaterialTable
                                                            title={"Encuestas Estudiantes"}
                                                            data={data}
                                                            columns={columns}
                                                            icons={tableIcons}
                                                            actions={[
                                                                {
                                                                    icon: Check,
                                                                    tooltip: 'Encuesta Estudiante',
                                                                    onClick: (event, rowData) => {
                                                                        this.datos(rowData);
                                                                        // swal({
                                                                        //     title: "Eliminar",
                                                                        //     text: "Seguro desea eliminar la nota",
                                                                        //     icon: "warning",
                                                                        //     buttons: ["NO", "SI"]
                                                                        // }).then(res => {
                                                                        //     if (res) {
                                                                        //         this.delete(rowData)
                                                                        //     } else {
                                                                        //         window.location = "/notastable";
                                                                        //     }
                                                                        // })

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
                                                        <prueba data={this.state.dato}></prueba>
                                                    </div>

                                                    <div className="mb-4 centrarelementos">
                                                        <button type="button" onClick={this.ResetearPost} className="col-sm-4 btn btn-outline-dark form-label boton-color" >RESETEAR</button>
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

export default Encuestas;