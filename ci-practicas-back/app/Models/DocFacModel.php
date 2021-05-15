<?php

namespace App\Models;

use CodeIgniter\Model;

class DocFacModel extends Model
{
    protected $table      = 'Docs_Facultad';
    protected $primaryKey = 'idDocs';
    protected $allowedFields = ['nombre','requerido','etapa'];
}
?>