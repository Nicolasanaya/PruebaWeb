import React, { Component } from 'react';
import '../css/Login.css'
import fondo from '../img/image.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import url from '../Conexions/conexion.js'
import swal from 'sweetalert';


const baseURL = url.url + "/SocialMedia";
const baseURL2 = url.url + "/Login/admin";
const baseURL3 = url.url + "/Ping";

class LoginAdmin extends Component {
    state = {
        socialMediaList: [],
        userName: '',
        password: '',
        status: false
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

    handleChange = (e) => {
        this.setState({
            userName: document.getElementById('userName').value,
            password: document.getElementById('password').value
        })
    };

    login = (event) => {
        event.preventDefault();
        const data = {
            'userName': this.state.userName,
            'password': this.state.password

        }
        // const formData = new FormData();
        // formData.append('userName', this.state.userName);
        // formData.append('password', this.state.password);
        // const asloginjson = JSON.parse(formData);
        // console.log(asloginjson)

        const config = {
            headers: { 'Content-Type': 'application/json' }

        }
        axios.post(baseURL2, data, config)
            .then(res => {
                // localStorage.setItem("token", res.data.token);
                console.log(res.status);
                if (res.request.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    window.location = ("/Principal")
                } else {

                }
            }).catch(function (error) {
                // console.log(res); 
                if (error.response.status === 400) {
                    swal({
                        title: "Contraseña",
                        text: "Su contraseña es incorrecta",
                        icon: "warning",
                        buttons: "Aceptar"
                    });
                } else if (error.response.status === 404) {
                    swal({
                        title: "Usuario",
                        text: "El usuario ingresado no esta registrado",
                        icon: "warning",
                        buttons: "Aceptar"
                    });
                } else if (error.response.status === 401) {
                    swal({
                        title: "Autorizacion",
                        text: "El usuario no tiene autorizacion",
                        icon: "warning",
                        buttons: "Aceptar"
                    });

                } else if (error.response.status === 500) {
                    swal({
                        title: "Servicio al Cliente",
                        text: "Comuniquese con el soporte",
                        icon: "warning",
                        buttons: "Aceptar"
                    });
                
                }


            })

        const config2 = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
        }

        axios.get(baseURL3, config2).then(res => { console.log(res.data) })



    }



    componentDidMount() {
        this.socialmediaget();
    }

    render() {
        return (
            // logo ateneo 

            <section className='vh-100 img-fluid' style={{ backgroundImage: `url(${fondo})`, backgroundSize: '100% 100%' }}>
                <div className='container py-5 h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col col-xl-10'>
                            <div className='card' style={{ borderRadius: '1rem' }}>
                                <div className='row g-0'>
                                    <div className='col-md-6 col-lg-5 d-none d-md-block'>
                                        <img
                                            src={require('../img/principal.jpeg')}
                                            alt='login form'
                                            className='img-fluid'
                                            style={{ borderRadius: '1rem 0 0 1rem' }}
                                        />
                                    </div>
                                    <div className='col-md-6 col-lg-7 d-flex align-items-center'>
                                        <div className='card-body p-4 p-lg-5 text-black'>
                                            <form>
                                                {/* <img className="logo mb-3 pb-3 centrarelementos" src={logo} ></img> */}
                                                <h2 className='fw-normal mb-3 pb-3 text-center' style={{ letterSpacing: '1px', color: '#FB034B' }}>Ateneo</h2>

                                                <div className='form-outline mb-4'>
                                                    <label className='form-label' htmlFor='userName'>Usuario</label>
                                                    <input type='email' id='userName' name='userName' className='form-control form-control-lg' onChange={this.handleChange} />
                                                </div>

                                                <div className='form-outline mb-4'>
                                                    <label className='form-label' htmlFor='password'>Contraseña</label>
                                                    <input type='password' name='password' id='password' className='form-control form-control-lg' onChange={this.handleChange} />
                                                </div>

                                                <div className='pt-1 mb-4 text-center'>
                                                    <button className='col-sm-4 btn btn-outline-dark boton-color' type='button' onClick={this.login}>Ingresar</button>
                                                </div>

                                                <div className="mb-4 centrarelementos">
                                                    <a className="link" href="/Registro">Registrarse</a>
                                                    <div className="mb-4 centrarelementos">
                                                        <a className="link" href="/Rclave">Olvido la Contraseña</a>
                                                    </div>
                                                </div>

                                                <div className="redes-container">
                                                    <ul>
                                                        {
                                                            this.state.socialMediaList.map(element =>
                                                                <li><a href={element.url} key={element.id} className={element.name}><i className={"fab fa-" + element.name}></i></a></li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default LoginAdmin;