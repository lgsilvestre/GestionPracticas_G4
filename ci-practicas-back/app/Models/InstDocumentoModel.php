<?php

namespace App\Models;

use CodeIgniter\Model;

class InstDocumentoModel extends Model
{
    protected $table      = 'instancia_documento';
    protected $primaryKey = 'id_instancia_documento';
    protected $allowedFields = ['nombre','requerido','comentario', 'link', 'numero_practica', 'refCarrera'];
}
?>