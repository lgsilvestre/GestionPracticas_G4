<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->post('login', 'UsersController::login');
$routes->get('showDataU', 'UsersController::showData');
$routes->post('registerUser', 'UsersController::registerUser');
$routes->post('deleteUserID', 'UsersController::deleteUserID');
$routes->post('adminEdit', 'UsersController::adminEdit');
$routes->post('registerAlumno', 'UsersController::registerAlumno');
$routes->post('getUserActive', 'UsersController::getUserActive');
$routes->post('getUsersAlumnos', 'UsersController::getUsersAlumnos');		//retorna todos los alumnos
$routes->post('getUserAlumno', 'UsersController::getUserAlumno');			//retorna un alumno
$routes->get('tablaPracticas', 'PracticaController::index');				//Devuelve la tabla de practicas
$routes->get('getPracticas', 'PracticaController::getPracticas');
$routes->post('filtrosTP', 'PracticaController::filtros');
$routes->post('solicitarPractica', 'PracticaController::solicitarPractica');
$routes->post('guardarInscripcion', 'PracticaController::guardarInscripcion');
$routes->post('guardarInscripcion', 'PracticaController::guardarInscripcion');
$routes->post('getUserId', 'UsersController::getUserId');
$routes->post('registerAlumno', 'UsersController::registerAlumno');

$routes->post('registerAlumnoExcel', 'UsersController::registerAlumnoExcel');
$routes->post('registerAlumnoExcelData', 'UsersController::registerAlumnoExcelData');
// Documentos
$routes->get('getDocumentos', 'DocumentoController::getDocumentos');
$routes->get('getDocumento', 'DocumentoController::getDocumento');
$routes->get('getDocumentosAdmin', 'DocumentoController::getDocumentosAdmin');
// Carreras
$routes->get('getCarreras', 'CarreraController::getCarreras');
// Practicas
$routes->post('pasarEstadoEvaluar', 'PracticaController::pasarEstadoEvaluar');
$routes->post('getEvaluacionEmpresa', 'PracticaController::getEvaluacionEmpresa');	// Entrega evaluacion empresa, si es 0 aún no se evalua
$routes->post('evaluarPractica', 'PracticaController::evaluarPractica');
$routes->post('getEvaluacionPracticaUni', 'PracticaController::getEvaluacionPracticaUni');	// Entrega evaluación empresa, si es 0 aún no se evalua
$routes->post('getPracticas', 'PracticaController::getPracticas');
$routes->post('ingresarPractica', 'PracticaController::ingresarPractica');
$routes->post('practicaInactiva', 'PracticaController::practicaInactiva');
$routes->get('servePracticaAlumno', 'PracticaController::servePracticaAlumno');
$routes->post('servePracticaAlumnoFiltrada', 'PracticaController::servePracticaFiltrada');
$routes->post('getEstadoPracticaAlumno', 'PracticaController::getEstadoPracticaAlumno');
$routes->post('aceptarSolicitud', 'PracticaController::aceptarSolicitud');
$routes->post('pasarCursando', 'PracticaController::pasarCursando');
$routes->post('inscribirInfo', 'PracticaController::inscribirInfo');
$routes->post('getDatosInscripcionAlumno', 'PracticaController::getDatosInscripcionAlumno');
$routes->post('aceptarInscripcion', 'PracticaController::aceptarInscripcion');
$routes->post('filtros', 'PracticaController::filtros');
$routes->get('getCantidadPracticasCarreras', 'PracticaController::getCantidadPracticasCarreras');
$routes->get('rechazarSolicitud', 'PracticaController::rechazarSolicitud');
$routes->post('getNumeroSiguientePractica', 'PracticaController::getNumeroSiguientePractica');
$routes->post('getSolicitud', 'PracticaController::getSolicitud');
$routes->post('getFechas', 'PracticaController::getFechas');
$routes->post('getEstadoPracticaActiva', 'PracticaController::getEstadoPracticaActiva');
$routes->post('ingresarPracticaCorreo', 'PracticaController::ingresarPracticaCorreo');
$routes->post('handleRechazo', 'PracticaController::handleRechazo');
$routes->post('handlerRechazarCorreo', 'PracticaController::handlerRechazarCorreo');
$routes->post('getRetroalimentacion', 'PracticaController::getRetroalimentacion');
$routes->post('aceptarInscripcionCorreo', 'PracticaController::aceptarInscripcionCorreo');
$routes->post('aceptarSolicitudCorreo', 'PracticaController::aceptarSolicitudCorreo');
$routes->post('inscribirInfoCorreo', 'PracticaController::inscribirInfoCorreo');
$routes->post('pasarEstadoEvaluarCorreo', 'PracticaController::pasarEstadoEvaluarCorreo');
$routes->post('evaluarPracticaCorreo', 'PracticaController::evaluarPracticaCorreo');
$routes->post('rechazarPractica', 'PracticaController::rechazarPractica');
$routes->post('rechazarPracticaCorreo', 'PracticaController::rechazarPracticaCorreo');
$routes->post('denegarPractica', 'PracticaController::denegarPractica');
$routes->post('getHistorialPractica', 'PracticaController::getHistorialPractica');
$routes->post('getInfoAlumnoPractica', 'PracticaController::getInfoAlumnoPractica');
$routes->post('getInfoPracticaById', 'PracticaController::getInfoPracticaById');
$routes->get('servePracticaAlumnoInactiva', 'PracticaController::servePracticaAlumnoInactiva');
// Alumno
$routes->get('getAlumnoMatricula', 'AlumnoController::getAlumnoMatricula');
$routes->post('getAlumnoIdMatricula', 'AlumnoController::getAlumnoIdMatricula');
$routes->get('getAlumnosAdmin', 'AlumnoController::getAlumnosAdmin');
$routes->get('getAlumnosEscuela', 'AlumnoController::getAlumnosEscuela');
$routes->get('getCarreraAlumno', 'AlumnoController::getCarreraAlumno');
$routes->post('getAlumnoId', 'AlumnoController::getAlumnoId');
$routes->post('recibirArchivoAlumno', 'AlumnoController::recibirArchivoAlumno');
$routes->post('recibirSeguro', 'AlumnoController::recibirSeguro');
// Instancia documento
$routes->post('getInstDocuAlumno', 'InstanciaDocumentoController::getInstanciasDocumento');
$routes->post('getInstDocuAlumnoRequerido', 'InstanciaDocumentoController::getInstanciasDocumentoRequerido');
$routes->post('getInstanciasDocumentosURL', 'InstanciaDocumentoController::getInstanciasDocumentosURL');
// Users
$routes->get('getFuncionarios', 'UserController::getFuncionarios');
$routes->get('deleteUser', 'UserController::deleteUser');
$routes->post('insertUser', 'UsersController::insertUser');
$routes->post('subirArchivoAdmin', 'UserController::subirArchivoAdmin');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */

//$routes->match(['get','post'],'login', 'UsersController::login',['filter' => 'NoAuth']);
//$routes->match(['get','post'],'login', 'UsersController::login');
//$routes->match(['get','post'],'profile', 'UsersController::profile');

if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
