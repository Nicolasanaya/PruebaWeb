import React, { Component } from 'react';
import Principal from './Principal';
import logo from '../img/logo.png';
import '../css/Perfilcss.css'
import axios from 'axios';
import url from '../Conexions/conexion.js'

const baseURL2 = url.url + "/Profile";

class Perfil extends Component {
    state = {
        profile: [],
        photo: '',
        name_LastName: '',
        id: '',
        identifier: '',
        email: '',
        academicProgram: '',
        userType: '',
        status: false

    }

    componentDidMount = () => {
        this.getperfil();
    }

    getperfil() {
        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL2, config2).then(res => {
            this.setState({
                profile: res.data.profile,
                photo: res.data.profile.photo,
                name_LastName: res.data.profile.name_LastName,
                id: res.data.profile.id,
                email: res.data.profile.email,
                identifier: res.data.profile.identifier,
                academicProgram: res.data.profile.academicProgram,
                userType: res.data.userType,
                status: true
            })
            // console.log(res.data.profile.photo)
        }).catch((error) => {
            console.log(error);
        });


    }
    render() {
        return (
            // <section className='vh-100 img-fluid' style={{ backgroundImage: `url(${fondo})`, backgroundSize: '100% 100%' }}>
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
                                                    <form className="form">
                                                        <section className="centrarelementos form">
                                                            <img className="logo" src={logo} alt="perfil"></img>
                                                            <b><h2 className="text-center mb-4">PERFIL</h2></b>
                                                        </section>
                                                        <img className='img-perfil' src={this.state.photo} alt="perfil"></img>
                                                        <b><label className="text-center mb-4">------------------------------------------------------</label></b>

                                                        <div className="form-outline mb-2">
                                                            {/* nombre */}
                                                            <label className="text-center"> <b>Nombres:</b> {this.state.name_LastName}</label>
                                                        </div>

                                                        <div className="form-outline mb-2">
                                                            {/* id institucional*/}
                                                            <label className="text-center "><b>ID:</b> {this.state.identifier}</label>
                                                        </div>

                                                        <div className="form-outline mb-2">
                                                            {/* correo*/}
                                                            <label className="text-center"><b>Correo:</b>{this.state.email}</label>
                                                        </div>

                                                        <div className="form-outline mb-2">                                                            
                                                            {/*Carrera*/}
                                                            <label className="text-center"><b> {this.state.academicProgram}</b></label>
                                                        </div>


                                                        <div className="mb-4 centrarelementos">
                                                            <a className="link" href="/PerfilUpdate"><button type="button" className="btn btn-outline-dark form-label boton-color" >MODIFICAR</button></a>                                                            </div>
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

export default Perfil;