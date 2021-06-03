<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model
{
    protected $table      = 'practica';
    protected $primaryKey = 'id_practica';
    protected $allowedFields = ['etapa', 'estado', 'carrera', 'numero', 'fecha_inicio', 'fecha_termino', 'empresa', 'supervisor', 'evaluacion_uni', 'evaluacion_empreesa', 'refAlumno'];
                                                //carrera derivado del alumno
                                                //anio derivado de fecha_inicio
}
?>