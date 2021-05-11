<?php

namespace App\Models;

use CodeIgniter\Model;

class PracticaModel extends Model
{
    protected $table      = 'Docs_Practica';
    protected $primaryKey = 'idDocsPrac';
    protected $allowedFields = ['idPractica','nombre','estado'];
}
?>