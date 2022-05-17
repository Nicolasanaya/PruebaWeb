import React, { Component } from 'react';
import logo from '../img/logo.png';
import Principal from './Principal';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';


const baseURL = url.url + "/SocialMedia";

class Media extends Component {

    state = {
        socialMediaList: [],
        status: false
    }

    handleChange = (e) => {
        this.setState({
            // socialMediaList: document.getElementById('socialMediaList').value,
            url: document.getElementById('url').value

        })
    };

    putsocialmedia = () => {
        const data = {
            'id': document.getElementById('socialMediaList').value,
            'url': this.state.url
        }
        console.log(data);
        const config = {
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.put(baseURL, data, config)
            .then(res => {
                console.log(res.status);

                if (res.status === 200) {

                    swal({
                        title: "RED SOCIAL",
                        text: "Su link fue Actualizado",
                        icon: "success",
                        buttons: "Aceptar"
                    }).then(function () {
                        window.location = "/Media";
                    })
                } if (res.status === 400) {
                    swal({
                        title: "RED SOCIAL",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }

            }).catch(function (error) {
                // console.log(res.status);

                if (error.response.status === 500) {
                    swal({
                        title: "RED SOCIAL",
                        text: "Error en el servidor",
                        icon: "error",
                        buttons: "Aceptar"
                    })
                } if (error.response.status === 400) {
                    swal({
                        title: "RED SOCIAL",
                        text: "Verifique los campos",
                        icon: "warning",
                        buttons: "Aceptar"
                    })
                } else {

                }
            })
    }

    socialmediaget = () => {
        axios.get(baseURL)
            .then(response => {
                this.setState({
                    socialMediaList: response.data.socialMediaList,
                    status: true
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentDidMount() {
        this.socialmediaget();
    }

    render() {
        return (

            <div className='sb-nav-fixed'>
                <div className='row g-0'>
                    <Principal />
                    <div id="layoutSidenav_content">
                        <div className='margen-top h-100'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div className=''>
                                    <div className='card' style={{ borderRadius: '1rem' }}>
                                        <div className=''>
                                            <div className='align-items-center'>
                                                <div className=' p-4 text-black'>
                                                    <section className="centrarelementos form">
                                                        <img className="logo" src={logo} alt="logo"></img>
                                                        <h3 className="text-center mb-4">ACTUALIZACION LINK REDES SOCIALES</h3>
                                                    </section>
                                                    <form className="form">
                                                        <h2 className="text-center mb-4">Redes Sociales</h2>

                                                        <label htmlFor="text"> <b>TIPO DE RED SOCIAL</b></label>
                                                        <div className="col-sm-10 mb-4">
                                                            <select className="form-select" aria-label="Default select example" name='socialMediaList' id='socialMediaList' onChange={this.handleChange}>
                                                                <option value="100">Seleccione una opcion</option>
                                                                {this.state.socialMediaList.map(element => (
                                                                    <option key={element.id} value={element.id} >{element.name}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <label htmlFor="text"><b>URL</b></label>

                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control mb-4" onChange={this.handleChange} name="url" id='url' />
                                                        </div>

                                                        <div className="mb-4 centrarelementos">
                                                            <button type="button" className=" btn btn-outline-dark boton-color" onClick={this.putsocialmedia}>ACTUALIZAR</button>
                                                        </div>
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

export default Media;