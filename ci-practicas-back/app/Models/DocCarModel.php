<?php

namespace App\Models;

use CodeIgniter\Model;

class DocCarModel extends Model
{
    protected $table      = 'Docs_Carrera';
    protected $primaryKey = 'idDocs';
    protected $allowedFields = ['nombre','requerido','etapa'];
}
?>