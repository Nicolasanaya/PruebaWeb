import React, { Component } from 'react';
import url from '../Conexions/conexion.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Principal from './Principal';
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

const baseURL = url.url + "/Teacher";


class Roles extends Component {
    state = {
        managers: [],
        datorol: [],
        show: false,
        status: false
    }

    componentDidMount = () => {
        this.datostabla();
    }

    datostabla() {

        const config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL, config).then(res => {
            this.setState({
                managers: res.data.managers,
                status: true
            })
            // console.log(res.data)
            // console.log(this.state.notas)
        }).catch((error) => {
            console.log(error);
        });


    }

    datosrol = (rowData) => {
        this.state.datorol = rowData
        const cooki = new Cookies();
        cooki.set('datorol', rowData.id, { path: '/' });
        window.location.href = '/RolesPerfil';

    }

    render() {
        const columns = [
            { title: 'id', field: 'id' , hidden: 'false'},
            { title: 'Nombre', field: 'nameLastName' },
            { title: 'ID', field: 'identifier' },
            { title: 'Estado', field: 'accountStatus' }
        ]

        const data = this.state.managers.map(elem => (
            { id: elem.id, nameLastName: elem.nameLastName, identifier: elem.identifier, accountStatus: elem.accountStatus }
        )
        )

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
                                                        <h2 className="text-center mb-4">ESTADO DE LAS CUENTAS</h2>
                                                    </section>
                                                    <div className="mb-4">

                                                        <MaterialTable
                                                            title={"Habilitacion de cuentas Docentes"}
                                                            data={data}
                                                            columns={columns}
                                                            icons={tableIcons}
                                                            actions={[
                                                                // {
                                                                //     icon: Edit,
                                                                //     tooltip: 'Editar notas',
                                                                //     onClick: (event, rowData) => {
                                                                //         this.putlist = rowData
                                                                //         this.put(rowData)
                                                                //         console.log(this.putlist)

                                                                //     }

                                                                // },
                                                                {
                                                                    icon: Check,
                                                                    tooltip: 'Actualizar Estado',
                                                                    onClick: (event, rowData) => {
                                                                        this.datosrol(rowData);
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
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Roles;