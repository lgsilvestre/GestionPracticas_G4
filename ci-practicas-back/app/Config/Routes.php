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
$routes->post('registerUser', 'UsersController::registerUser');
$routes->post('deleteUserID', 'UsersController::deleteUserID');
$routes->post('adminEdit', 'UsersController::adminEdit');
$routes->post('registerAlumno', 'UsersController::registerAlumno');
$routes->post('getUserActive', 'UsersController::getUserActive');
$routes->post('getUsersAlumnos', 'UsersController::getUsersAlumnos');		//retorna todos los alumnos
$routes->post('getUserAlumno', 'UsersController::getUserAlumno');			//retorna un alumno
$routes->get('tablaPracticas', 'PracticaController::index');				//Devuelve la tabla de practicas
$routes->post('filtrosTP', 'PracticaController::filtros');
$routes->post('solicitarPractica', 'PracticaController::solicitarPractica');
$routes->post('guardarInscripcion', 'PracticaController::guardarInscripcion');


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
