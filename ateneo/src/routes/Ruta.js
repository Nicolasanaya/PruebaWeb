import React from 'react';
import Login from '../pages/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Registro from '../pages/Registro';
import Rclave from '../pages/Rclave';
import Formulario from '../pages/Formulario';
import Principal from '../pages/Principal';
import Perfil from '../pages/Perfil';
import Media from '../pages/Media';
import LoginAdmin from '../pages/LoginAdmin';
import Notas from '../pages/Notas';
import NotasTable from '../pages/NotasTable';
import NotasModificar from '../pages/NotasModificar';
import Encuestas from '../pages/Encuestas';
import EncuestaEstudiante from '../pages/EncuestaEstudiante';
import Roles from '../pages/Roles';
import RolesPerfil from '../pages/RolesPerfil';
import RolesEstudiantes from '../pages/RolesEstudiantes';
import RolesEstudiantesPerfil from '../pages/RolesEstudiantesPerfil';
import NotasEstudiantes from '../pages/NotasEstudiantes';
import Materias from '../pages/Materias';
import Pqr from '../pages/Pqr';
import Peticiones from '../pages/Peticiones';
import ValidarPeticiones from '../pages/ValidarPeticiones';
import PeticionesAdmin from '../pages/PeticionesAdmin';
import Citas from '../pages/Citas';
import PerfilUpdate from '../pages/PerfilUpdate';
import CorreoUpdate from '../pages/CorreoUpdate';
import RolDocente from '../pages/RolDocente';
import RolDocenteUpdate from '../pages/RolDocenteUpdate';
import ValidarDocente from '../pages/ValidarDocente';
import AgendaConcejero from '../pages/AgendaConcejero';
import EditarAgenda from '../pages/EditarAgenda';
import Tutorias from '../pages/Tutorias';
import AsignarHorario from '../pages/AsignarHorario';
import TablaHorarios from '../pages/TablaHorarios';
import EditarHorario from '../pages/EditarHorario';
import Credenciales from '../pages/Credenciales';
import AgendaDocente from '../pages/AgendaDocente';
import AteneoTutorias from '../pages/AteneoTutorias';
import AgendaEstudiante from '../pages/AgendaEstudiante';
import Lugar from '../pages/Lugar';
import Preguntas from '../pages/Preguntas';
import TablaPreguntas from '../pages/TablaPreguntas';
import Respuesta from '../pages/Respuesta';
import Tablarespuestas from '../pages/Tablarespuestas';
import EditarPregunta from '../pages/EditarPregunta';
import EditarRespuesta from '../pages/EditarRespuesta';
import TablaPreguntasEst from '../pages/TablaPreguntasEst';
import TablarespuestasEst from '../pages/TablarespuestasEst';
import Generarpregunta from '../pages/Generarpregunta';
import PreguntasEst from '../pages/PreguntasEst';
import ES from '../pages/ES';
import CrearQr from '../pages/CrearQr';
import EncuestaSatisfaccion from '../pages/EncuestaSatisfaccion';
import Satisfaccion from '../pages/Satisfaccion';
import ActualizarFiles from '../pages/ActualizarFiles';
import AnalisisDocente from '../pages/AnalisisDocente';
import AnalisisSatisfaccion from '../pages/AnalisisSatisfaccion';

function Ruta(props) {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/Registro' element={<Registro></Registro>}></Route>
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/Rclave" element={<Rclave />} />
          <Route path="/Principal" element={<Principal />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path='/PerfilUpdate' element={<PerfilUpdate />} />
          <Route path='/Pqr' element={<Pqr />} />
          <Route path='/EditarHorario' element={<EditarHorario />} />
          <Route path='/Credenciales' element={<Credenciales />} />
          <Route path='/AgendaDocente' element={<AgendaDocente />} />
          <Route path='/AteneoTutorias' element={<AteneoTutorias />} />
          <Route path='/AgendaEstudiante' element={<AgendaEstudiante />} />
          <Route path='/Citas' element={<Citas />} />
          <Route path='/CorreoUpdate' element={<CorreoUpdate />} />
          <Route path='/AgendaConcejero' element={<AgendaConcejero />} />
          <Route path='/EditarAgenda' element={<EditarAgenda />} />
          <Route path='/AsignarHorario' element={<AsignarHorario />} />
          <Route path='/LoginAdmin' element={<LoginAdmin />} />
          <Route path='/Media' element={<Media />} />
          <Route path='/Notas' element={<Notas />} />
          <Route path='/EncuestaEstudiante' element={<EncuestaEstudiante />} />
          <Route path='/Materias' element={<Materias />} />
          <Route path='/NotasEstudiantes' element={<NotasEstudiantes />} />
          <Route path='/NotasModificar' element={<NotasModificar />} />
          <Route path='/Encuestas' element={<Encuestas />} />
          <Route path='/Tutorias' element={<Tutorias />} />
          <Route path='/NotasTable' element={<NotasTable />} />
          <Route path='/Peticiones' element={<Peticiones />} />
          <Route path='/PeticionesAdmin' element={<PeticionesAdmin />} />
          <Route path='/RolDocente' element={<RolDocente />} />
          <Route path='/RolDocenteUpdate' element={<RolDocenteUpdate />} />
          <Route path='/Roles' element={<Roles />} />
          <Route path='/RolesPerfil' element={<RolesPerfil />} />
          <Route path='/RolesEstudiantes' element={<RolesEstudiantes />} />
          <Route path='/RolesEstudiantesPerfil' element={<RolesEstudiantesPerfil />} />
          <Route path='/TablaHorarios' element={<TablaHorarios />} />
          <Route path='/ValidarPeticiones' element={<ValidarPeticiones />} />
          <Route path='/ValidarDocente' element={<ValidarDocente />} />
          <Route path='/Lugar' element={<Lugar />} />
          <Route path='/Preguntas' element={<Preguntas />} />
          <Route path='/TablaPreguntas' element={<TablaPreguntas />} />
          <Route path='/Respuesta' element={<Respuesta />} />
          <Route path='/Tablarespuestas' element={<Tablarespuestas />} />
          <Route path='/EditarPregunta' element={<EditarPregunta />} />
          <Route path='/EditarRespuesta' element={<EditarRespuesta />} />
          <Route path='/TablaPreguntasEst' element={<TablaPreguntasEst />} />
          <Route path='/TablarespuestasEst' element={<TablarespuestasEst />} />
          <Route path='/Generarpregunta' element={<Generarpregunta />} />
          <Route path='/PreguntasEst' element={<PreguntasEst />} />
          <Route path='/ES/:id' element={<ES />} />
          <Route path='/CrearQr' element={<CrearQr />} />
          <Route path='/EncuestaSatisfaccion' element={<EncuestaSatisfaccion />} />
          <Route path='/Satisfaccion' element={<Satisfaccion />} />
          <Route path='/ActualizarFiles' element={<ActualizarFiles />} />
          <Route path='/AnalisisDocente' element={<AnalisisDocente />} />
          <Route path='/AnalisisSatisfaccion' element={<AnalisisSatisfaccion />} />

        </Routes>
      </BrowserRouter>
    );
}

export default Ruta;