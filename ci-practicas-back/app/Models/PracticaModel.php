<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model               //hay que ajustar al esquema hecho por el fepe
{
    protected $table      = 'practica';
    protected $primaryKey = 'idPractica';
    protected $allowedFields = ['CodigoPlan','Nombre','Duracion','Descripcion','Fecha', 'Estado', 'Nota', 'EvaluacionEmpresa', 'EvaluacionUniversidad', 'Supervisor', 'Empresa', 'Numero']; //No todas corresponden a la base de datos, falta arreglar
}
?>