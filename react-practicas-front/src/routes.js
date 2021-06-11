// import Estudiante from '../Pages/Estudiante/Estudiante';
// import Postulaciones from '../Pages/Postulaciones';
// import Ofertas from '../Pages/Ofertas/Ofertas';
// import Administrador from '../Pages/Administrador/Administrador';
// import { Estadisticas } from '../Pages/Estadisticas';
// import { TablaEstados } from '../Pages/Administrador/EstadoPracticas/TablaEstados';
import { Info } from "./views/Info";
import Dashboard  from "./views/Administrador/Dashboard";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/practicas",
    name: "Practicas",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/administradores",
    name: "Administradores",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",

  },
  {
    path: "/estudiantes",
    name: "Estudiantes",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",

  },
  {
    path: "/postulaciones",
    name: "Postulaciones",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",

  },
  {
    path: "/ofertas",
    name: "Ofertas",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",

  },
  {
    path: "/estadisticas",
    name: "Estadisticas",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  }
  
];
export default routes;