import React, { Component } from 'react';
import QRCode from "react-qr-code";
import Cookies from 'universal-cookie';
import Principal from './Principal';
import url from '../Conexions/conexion.js'


class CrearQr extends Component {

    state = {
        datosdocQR: '',
        state: true
    }

    render() {
        const cooki = new Cookies();
        const datosAgenda = cooki.get('datosdocQR')
        this.state.datosdocQR = datosAgenda
        const urlqr = "http://192.168.1.5:3000" + "/Es/" + datosAgenda
        return (
            <div >
                <div className='sb-nav-fixed'>
                    <div className='row g-0'>
                        <div id="layoutSidenav_content">
                            <Principal />
                            <div className='margen-top h-100'>
                                <div className='d-flex justify-content-center align-items-center h-100'>
                                    <div className=''>
                                        <div className='card' style={{ borderRadius: '2rem' }}>
                                            <div className=''>
                                                <div className='align-items-center'>
                                                    <div className=' p-4 text-black'>
                                                        <section className="centrarelementos">
                                                            <h2 className="text-center mb-4">QR</h2>
                                                        </section>
                                                        <form className="form">

                                                            <QRCode value={urlqr} size={256} bgColor="#282c34" fgColor="#fff" level="H" />


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
            </div>
        );
    }
}

export default CrearQr;